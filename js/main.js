// 初始化全局数据
var configJson = {}

// 这里有一些空数据，在本文件加载完成后，会加载`index.meta.js` 和 `index.settings.js` 补齐数据
// settings.js
var settingsJson = {}
var unlockObjs = []
// config.js
var rawConfigJson = {}
// data.js
var itemNames = []
var buffNames = []
var prefixNames = []
// items.js
var itemsPngInfo = {}
InitSpriteEl()

const ItemCount = 5452
const NpcCount = 687
// const BuffCount = 354

// 调试开关
const testMode = false
if (testMode) {
	setTimeout(function () {
		CreateTestData()
		UpdateTable()
		UpdateFrm(3)
	}, 300)
}


document.addEventListener("DOMContentLoaded", function () {
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})

//#region 导入导出
// 导入文件
document.getElementById("importFile").onchange = (e) => {
	let reader = new FileReader()
	reader.onload = (event) => {
		json_obj = JSON.parse(event.target.result)
		if (typeof (json_obj) != 'undefined' && json_obj.hasOwnProperty('shop')) {
			configJson = json_obj
			UpdateTable()
		} else {
			alert("请选择正确的配置文件！")
		}
	}
	reader.onerror = () => reject(error)
	reader.readAsText(e.target.files[0])
}

document.getElementById("versionText").innerText = "鱼店配置编辑器 v0.1(20230427)"

// 导出文件
document.getElementById("exportFile").onclick = (e) => {
	if (!configJson.hasOwnProperty("shop")) {
		alert("请先导入配置文件")
		return;
	}

	// 店铺基本信息
	configJson["name"] = document.getElementById("shopName").value
	configJson["pageSlots"] = document.getElementById("pageSlots").value
	configJson["rowSlots"] = document.getElementById("rowSlots").value

	let saveStr = JSON.stringify(configJson, null, 2)
	let saveFile = new Blob([saveStr], { type: "text/plain" })
	let linkEl = document.createElement('a')
	linkEl.download = "config.json"
	linkEl.href = window.URL.createObjectURL(saveFile)
	linkEl.style.display = "none"
	document.body.appendChild(linkEl)
	linkEl.click()
	document.body.removeChild(linkEl)
}
//#endregion


// 载入鱼店默认配置
function LoadRawConfig() {
	configJson = rawConfigJson;
	UpdateTable()
}

// 表格
function UpdateTable() {
	if (!configJson.hasOwnProperty("shop")) {
		alert("配置文件不正确！")
		return
	}

	// 商店信息
	document.getElementById("shopName").value = configJson["name"]
	document.getElementById("pageSlots").value = configJson["pageSlots"]
	document.getElementById("rowSlots").value = configJson["rowSlots"]
	let metaEl = document.getElementById("shopMeta")
	if (metaEl.style.display == "none") {
		metaEl.style.display = "block"
	}

	let tableEl = document.getElementById("tableBody")
	ClearChild(tableEl)

	// 读取json
	for (let i = 0; i < configJson["shop"].length; i++) {
		tableEl.appendChild(CreateTabelEl(i))
	}
}

// 创建一行表格
function CreateTabelEl(index) {
	let data = configJson['shop'][index]

	let trEl = document.createElement('tr')
	let nameEl = document.createElement('td')
	let costEl = document.createElement('td')
	let unlockEl = document.createElement('td')
	let actionEl = document.createElement('td')

	// 物品名
	FillItemName(data, nameEl, (index + 1))

	// 花费
	if (data.hasOwnProperty("cost")) {
		costEl.classList.add("fs-7")
		for (let i = 0; i < data["cost"].length; i++) {
			let splitStr = i < data["cost"].length - 1 ? ", " : ""
			FillItemName(data["cost"][i], costEl, 0, "", splitStr)
		}
	}

	// 解锁
	if (data.hasOwnProperty("unlock")) {
		unlockEl.classList.add("fs-7")
		for (let i = 0; i < data["unlock"].length; i++) {
			let splitStr = i < data["unlock"].length - 1 ? ", " : ""
			unlockEl.innerHTML += `<span class="fs-7">${GetUnlockName(data["unlock"][i])}${splitStr}</span>`
		}
	}
	if (unlockEl.innerHTML == "") {
		unlockEl.innerHTML = "--"
	}

	// 操作按钮
	actionEl.innerHTML = CreateActionEl(index);

	trEl.appendChild(nameEl)
	trEl.appendChild(costEl)
	trEl.appendChild(unlockEl)
	trEl.appendChild(actionEl)

	return trEl
}

function DelTableEL(btnEl) {
	if (configJson['shop'].length == 1) {
		alert("已经是最后一条数据了，不支持删除！")
		return
	} else {
		let modalEl = document.getElementById("delModal")
		let index = parseInt(btnEl.dataset['param'])
		modalEl.dataset["param"] = index

		let modalObj = new bootstrap.Modal(modalEl)
		modalObj.show()
	}
}

// 插入一行表格
function AddTableEL(btnEl) {
	let tableEl = document.getElementById("tableBody")
	let index = parseInt(btnEl.dataset["param"])
	let newData = {
		name: "土块",
		id: 2,
		comment: "你是不知道土块能在国外卖多少钱。",
		cost: [{ name: "铜", stack: 165 }]
	}

	if (!configJson.hasOwnProperty("shop")) {
		configJson["name"] = document.getElementById("shopName").value
		configJson["pageSlots"] = ValueToInt(document.getElementById("pageSlots").value)
		configJson["rowSlots"] = ValueToInt(document.getElementById("rowSlots").value)

		index = -1
		configJson["shop"] = [newData]
		let metaEl = document.getElementById("shopMeta")
		if (metaEl.style.display == "none") {
			metaEl.style.display = "block"
		}
		ClearChild(tableEl)

	}
	else if (index < configJson["shop"].length - 1) {
		configJson["shop"].splice(index + 1, 0, newData)
	} else {
		configJson["shop"].push(newData)
	}

	let trEl = CreateTabelEl((index + 1))
	let total = configJson["shop"].length
	if (total > 1 && index < total - 1) {
		tableEl.insertBefore(trEl, tableEl.children[(index + 1)])
	} else {
		tableEl.appendChild(trEl)
	}
	RefreshTableIndex(index)
}

function CreateActionEl(index) {
	// actionEl.innerHTML = `<a href="#delModal" class="link-secondary" data-bs-toggle="modal" data-param="${i}">删除</a> <a href="#" class="link-secondary" data-bs-toggle="modal" data-bs-target="#frmModal" data-param="${i}">编辑</a>`
	// <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#delModal" data-param=${index} onclick="DelTableEL(this)">-</button>
	return `<span class="btn-group btn-group-sm">
	<button class="btn btn-outline-secondary btn-sm" data-param=${index} onclick="DelTableEL(this)">-</button>
	<button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#frmModal" data-param=${index}>编辑</button>
	<button class="btn btn-outline-secondary btn-sm" data-param=${index} onclick="AddTableEL(this)">+</button>
	</span>`
}



// 更新各行表格的索引值
function RefreshTableIndex(index) {
	let tableEl = document.getElementById("tableBody")
	for (let i = 0; i < tableEl.children.length; i++) {
		if (i < index) {
			continue;
		}

		const trEl = tableEl.children[i];
		// 商品序号
		trEl.children[0].children[0].children[0].innerText = `${i + 1}.`
		// - / 编辑 / + 按钮上的索引值数据
		trEl.children[3].children[0].children[0].dataset["param"] = i
		trEl.children[3].children[0].children[1].dataset["param"] = i
		trEl.children[3].children[0].children[2].dataset["param"] = i
	}
}


// 删除商品确认框
document.getElementById("delModal").addEventListener('show.bs.modal', (event) => {
	let objEl = event.relatedTarget
	if (typeof (objEl) == 'undefined') {
		objEl = event.currentTarget
	}
	let index = parseInt(objEl.dataset['param'])

	if (configJson['shop'].length == 1) {
		return
	}

	let data = configJson['shop'][index]

	let contentEl = document.getElementById("delModalContent")
	ClearChild(contentEl)
	FillItemName(data, contentEl, (index + 1), "是否删除 ", " ？")

	let btnEl = document.getElementById('delModalConfirm')
	btnEl.dataset['param'] = index
	btnEl.focus()
})

// 删除商品并更新表格
document.getElementById("delModalConfirm").onclick = (event) => {
	let index = parseInt(event.currentTarget.dataset['param'])
	configJson["shop"].splice(index, 1)
	let tableEl = document.getElementById("tableBody")
	tableEl.removeChild(tableEl.children[index])
	RefreshTableIndex(index);
}

// 表单
document.getElementById("frmModal").addEventListener('show.bs.modal', (event) => {
	let index = parseInt(event.relatedTarget.dataset['param'])
	UpdateFrm(index)
})

// 更新表单数据
function UpdateFrm(index) {
	let data = configJson['shop'][index]

	let titleEl = document.getElementById("frmTitle")
	let iconEl = document.getElementById("frmItemIcon")
	let nameEl = document.getElementById("frmItemName")
	let idEl = document.getElementById("frmItemId")
	let stackEl = document.getElementById("frmItemStack")
	let prefixEl = document.getElementById("frmItemPrefix")
	let commentEl = document.getElementById("frmItemComment")
	let limitEl = document.getElementById("frmLimit")
	let serverLimitEl = document.getElementById("frmServerLimit")
	let commandEl = document.getElementById("frmCommand")
	let groupEl = document.getElementById("frmAllowGroup")

	let confirmEl = document.getElementById("frmConfirm")
	confirmEl.dataset["param"] = index

	ClearChild(titleEl)
	FillItemName(data, titleEl, (index + 1))

	// name/id/icon
	let id = data.hasOwnProperty("id") ? data["id"] : 0
	let nameStr = data.hasOwnProperty("name") ? data.name : ""
	if (nameStr != "" && id == 0) {
		id = GetIdByName(nameStr)
	}
	idEl.value = id != 0 ? id : ""
	nameEl.value = nameStr
	SetItemIcon(id, iconEl)
	ShowHideCmdAndBuff(id)
	nameEl.focus()

	stackEl.value = data.hasOwnProperty("stack") ? "x" + data["stack"] : ""
	commentEl.value = data.hasOwnProperty("comment") ? data["comment"] : ""
	limitEl.value = data.hasOwnProperty("limit") ? data["limit"] : ""
	serverLimitEl.value = data.hasOwnProperty("serverLimit") ? data["serverLimit"] : ""
	groupEl.value = data.hasOwnProperty("allowGroup") ? data["allowGroup"].join(",") : ""

	// 词缀
	// 词缀下拉列表
	if (prefixEl.children.length == 1) {
		for (let i = 0; i < prefixNames.length; i++) {
			let name = prefixNames[i]
			let id = i + 1
			prefixEl.innerHTML += `<option value="${id}"> ${name}（${id}）</option>`
		}
	}
	if (data.hasOwnProperty("prefix")) {
		let prefix = data["prefix"]
		let index = prefixNames.indexOf(prefix)
		if (index != -1)
			prefixEl.value = (index + 1)
		else
			prefixEl.value = ""
	} else {
		prefixEl.value = ""
	}

	// 指令
	if (data.hasOwnProperty("cmds")) {
		commandEl.value = data["cmds"].join("\n")
		commandEl.rows = data["cmds"].length
	} else {
		commandEl.value = ""
		commandEl.rows = 1
	}

	// buff
	let buffEl = document.getElementById("frmBuff")
	ClearChild(buffEl)
	if (data.hasOwnProperty("buffs")) {
		let buffArr = data["buffs"]
		let secondsArr = data.hasOwnProperty("seconds") ? data["seconds"] : ""
		for (let i = 0; i < buffArr.length; i++) {
			let buffId = buffArr[i]
			let seconds = i < secondsArr.length ? secondsArr[i] : 60
			buffEl.appendChild(CreateBuffEl(buffId, seconds))
		}
		if (buffArr.length == 0) {
			buffEl.appendChild(CreateBuffEl())
		}
	} else {
		buffEl.appendChild(CreateBuffEl())
	}


	// 价格
	let costEl = document.getElementById("frmCost")
	ClearChild(costEl)
	if (data.hasOwnProperty("cost")) {
		let costDatas = data["cost"]
		for (let i = 0; i < costDatas.length; i++) {
			let costData = costDatas[i]
			let costName = costData.hasOwnProperty("name") ? costData["name"] : ""
			let costId = costData.hasOwnProperty("id") ? costData["id"] : 0
			let costStack = costData.hasOwnProperty("stack") ? costData["stack"] : 0
			let costCmd = costData.hasOwnProperty("cmd") ? costData["cmd"] : ""
			costEl.appendChild(CreateCostEl(costName, costId, costStack, costCmd))
		}
		if (costDatas.length == 0) {
			costEl.appendChild(CreateCostEl())
		}
	} else {
		costEl.appendChild(CreateCostEl())
	}

	// 条件
	let unlockEl = document.getElementById("frmUnlock")
	ClearChild(unlockEl)
	if (data.hasOwnProperty("unlock")) {
		let costDatas = data["unlock"]
		for (let i = 0; i < costDatas.length; i++) {
			let costData = costDatas[i]
			let costName = costData.hasOwnProperty("name") ? costData["name"] : ""
			let costId = costData.hasOwnProperty("id") ? costData["id"] : 0
			let costStack = costData.hasOwnProperty("stack") ? costData["stack"] : 0
			unlockEl.appendChild(CreateUnlockEl(costName, costId, costStack))
		}
		if (costDatas.length == 0) {
			unlockEl.appendChild(CreateUnlockEl())
		}
	} else {
		unlockEl.appendChild(CreateUnlockEl())
	}
}

// 点击表单的确认按钮
document.getElementById("frmConfirm").onclick = (event) => {
	let index = parseInt(event.currentTarget.dataset['param'])

	let nameStr = document.getElementById("frmItemName").value
	let id = ValueToInt(document.getElementById("frmItemId").value)
	let stack = ValueToInt(document.getElementById("frmItemStack").value)
	let prefix = document.getElementById("frmItemPrefix").value
	let comment = document.getElementById("frmItemComment").value
	let limitNum = ValueToInt(document.getElementById("frmLimit").value)
	let serverLimitNum = ValueToInt(document.getElementById("frmServerLimit").value)
	let commandStr = document.getElementById("frmCommand").value
	let group = document.getElementById("frmAllowGroup").value

	let data = {}
	if (nameStr != "") data.name = nameStr
	if (id != 0) data.id = id
	if (stack > 1) data.stack = stack
	if (prefix != "") data.prefix = prefix
	if (comment != "") data.comment = comment
	if (limitNum != 0) data.limit = limitNum
	if (serverLimitNum != 0) data.serverLimit = serverLimitNum
	if (group != "") data.allowGroup = group.split(",");

	// 指令
	if (id == -160 && commandStr != "") data.cmds = commandStr.split("\n");
	// buff
	if (id == -159) {
		let buffEl = document.getElementById("frmBuff")
		for (const el of buffEl.children) {
			let buffId = ValueToInt(el.children[2].value)
			let buffSecond = ValueToInt(el.children[3].value)
			if (buffId != 0) {
				if (buffSecond == 0) {
					buffSecond = 60
				}
				if (!data.hasOwnProperty("buffs")) {
					data.buffs = []
					data.seconds = []
				}
				data.buffs.push(buffId)
				data.seconds.push(buffSecond)
			}
		}
	}

	// cost
	let costEl = document.getElementById("frmCost")
	for (const el of costEl.children) {
		let costName = el.children[1].value
		let costId = ValueToInt(el.children[2].value)
		let costStack = ValueToInt(el.children[3].value)
		let costCmd = el.children[4].value

		let obj = {}
		if (costName != "") obj.name = costName
		if (costId != 0) obj.id = costId
		if (costStack < 2) obj.stack = costStack
		if (costCmd != "") obj.cmd = costcmd
		if (!data.hasOwnProperty("cost")) {
			data["cost"] = []
		}
		data["cost"].push(obj)
	}

	// unlock
	let unlockEl = document.getElementById("frmUnlock")
	for (const el of unlockEl.children) {
		let unlockName = el.children[0].value
		let unlockId = ValueToInt(el.children[1].value)
		let unlockStack = ValueToInt(el.children[2].value)

		let obj = {}
		if (unlockName != "") obj.name = unlockName
		if (unlockId != 0) obj.id = unlockId
		if (unlockStack > 1) obj.stack = unlockStack
		if (unlockName == "" && unlockId == 0 && unlockStack == 0) { continue }
		if (!data.hasOwnProperty("unlock")) {
			data["unlock"] = []
		}
		data["unlock"].push(obj)
	}

	// 更新数据
	configJson["shop"][index] = data

	// 更新主表格
	let tableEl = document.getElementById("tableBody")
	tableEl.removeChild(tableEl.children[index])
	let trEl = CreateTabelEl(index)
	let total = configJson["shop"].length;
	if (total > 1 && index < total - 1) {
		tableEl.insertBefore(trEl, tableEl.children[(index)])
	} else {
		tableEl.appendChild(trEl)
	}
}


//#region buff
function ChangeBuffName(target) {
	let parentEl = target.parentElement
	let iconEl = parentEl.children[0].children[0]
	let tempId = GetBuffIDByName(target.value)
	SetBuffIcon(tempId, iconEl)
	parentEl.children[2].value = tempId
}


function ChangeBuffId(target) {
	let parentEl = target.parentElement
	SetBuffIcon(target.value, parentEl.children[0].children[0])
	let buffName = GetBuffName(target.value)
	parentEl.children[1].value = buffName != "" ? buffName : ""
	if (buffName == "")
		parentEl.children[2].value = ""
}

function DelBuffEl(target) {
	let topEl = target.parentElement.parentElement
	let parentEl = target.parentElement
	if (topEl.children.length == 1) {
		ClearCanvas(parentEl.children[0].children[0])
		parentEl.children[1].value = ""
		parentEl.children[2].value = ""
		parentEl.children[3].value = ""
	} else {
		topEl.removeChild(parentEl)
	}
}

function AddBuffEl(target) {
	let topEl = target.parentElement.parentElement
	let parentEl = target.parentElement
	let index = Array.from(topEl.children).indexOf(parentEl)
	let newEl = CreateBuffEl()
	if (parentEl != topEl.lastChild) {
		topEl.insertBefore(newEl, topEl.children[index + 1])
	} else {
		topEl.appendChild(newEl)
	}
}

function CreateBuffEl(buffId = 0, seconds = 0) {
	let newEl = document.createElement("div")
	newEl.classList.add("input-group")
	newEl.classList.add("input-group-sm")
	// <input type="text" class="form-control" disabled style="background-color: #fff;color: #7d858c;" value="buff" title="展示buff名称用，无需填写">
	newEl.innerHTML = `<span class="input-group-text"><canvas width=16 height=16 data-buff=${buffId}></canvas></span>
	<input type="text" class="form-control" placeholder="buff" onchange="ChangeBuffName(this)">
	<input type="number" min="0" max="354" class="form-control" placeholder="id" title="buff id（1~354）（0或空表示不添加）" onchange="ChangeBuffId(this)">
	<input type="number" min="60" max="35791393" class="form-control" placeholder="秒" title="持续时间，最大值为 35791393（415天）">
	<button class="btn btn-outline-secondary input-control" onclick="DelBuffEl(this)">-</button>
	<button class="btn btn-outline-secondary input-control" onclick="AddBuffEl(this)">+</button>`

	if (buffId != 0) {
		SetBuffIcon(buffId, newEl.children[0].children[0])
		newEl.children[1].value = GetBuffName(buffId)
	}
	if (seconds > 0) {
		newEl.children[2].value = buffId
		newEl.children[3].value = seconds
	}
	return newEl
}
//#endregion


//#region 价格
function ChangeItemName(target) {
	let parentEl = target.parentElement
	let iconEl = parentEl.children[0].children[0]

	let id = parentEl.children[2].value
	if (id == -159 || id == -160) {
	} else {
		id = GetIdByName(target.value)
		parentEl.children[2].value = id
	}
	SetItemIcon(id, iconEl)
	ShowHideCmdAndBuff(id)

}

function ChangeItemId(target) {
	let id = parseInt(target.value)
	let parentEl = target.parentElement
	SetItemIcon(id, parentEl.children[0].children[0])
	parentEl.children[1].value = GetItemName(id)
	ShowHideCmdAndBuff(id)
}

function ShowHideCmdAndBuff(id) {
	let buffEl = document.getElementById("frmBuff")
	if (id == -159) {
		if (buffEl.style.display == "none") {
			buffEl.style.display = "flex"
		}
	} else {
		if (buffEl.style.display == "flex") {
			buffEl.style.display = "none"
		}
	}

	let cmdEl = document.getElementById("frmCommand")
	if (id == -160) {
		if (cmdEl.style.display == "none") {
			cmdEl.style.display = "block"
		}
	} else {
		if (cmdEl.style.display == "block") {
			cmdEl.style.display = "none"
		}
	}
}

function DelCostEl(target) {
	let topEl = target.parentElement.parentElement
	let parentEl = target.parentElement
	if (parentEl == topEl.firstElementChild) {
		ClearCanvas(parentEl.children[0].children[0])
		parentEl.children[1].value = "名称"
		parentEl.children[2].value = ""
		parentEl.children[3].value = ""
	} else {
		topEl.removeChild(parentEl)
	}
}

function AddCostEl(target) {
	let topEl = target.parentElement.parentElement
	let parentEl = target.parentElement
	let index = Array.from(topEl.children).indexOf(parentEl)
	let newEl = CreateCostEl()
	if (parentEl != topEl.lastChild) {
		topEl.insertBefore(newEl, topEl.children[index + 1])
	} else {
		topEl.appendChild(newEl)
	}
}

function CreateCostEl(costName = "", costId = 0, costStack = 0, costCmd = "") {
	let newEl = document.createElement("div")
	newEl.classList.add("input-group")
	newEl.classList.add("input-group-sm")
	newEl.innerHTML = `<span class="input-group-text"><canvas width=16 height=16></canvas></span>
	<input type="text" class="form-control" placeholder="名称" onchange="ChangeItemName(this)">
	<input type="number" min="0" max=${ItemCount} class="form-control" placeholder="id" onchange="ChangeItemId(this)">
	<input type="number" min="1" max=9999 class="form-control" 
		placeholder="堆叠">
	<button class="btn btn-outline-secondary input-control" onclick="DelCostEl(this)">-</button>
	<button class="btn btn-outline-secondary input-control" onclick="AddCostEl(this)">+</button>`
	if (costId != 0) {
		SetItemIcon(costId, newEl.children[0].children[0])
		newEl.children[1].value = GetItemName(costId)
		newEl.children[2].value = costId
	}
	if (costName != "") {
		newEl.children[1].value = costName
		let tempId = GetIdByName(costName)
		if (tempId != 0) {
			SetItemIcon(tempId, newEl.children[0].children[0])
		}
	}
	if (costStack != 0) newEl.children[3].value = costStack
	if (costCmd != "") newEl.children[4].value = costCmd
	return newEl
}
//#endregion


//#region 解锁条件
function ChangeUnlockName(target) {
	let tempId = GetUnlockIdByName(target.value)
	if (tempId == 0) {
		return
	}

	let parentEl = target.parentElement
	parentEl.children[1].value = tempId

	let timesEl = parentEl.children[2]
	let id = parseInt(target.value)
	ShowHideUnlockEl(id, timesEl)
}

function ChangeUnlockId(target) {
	let parentEl = target.parentElement
	parentEl.children[0].value = GetUnlockNameById(target.value)

	let timesEl = parentEl.children[2]
	let id = parseInt(target.value)
	ShowHideUnlockEl(id, timesEl)
}

function ShowHideUnlockEl(id, timesEl) {
	if (id == -100) {
		if (timesEl.style.display == "none") {
			timesEl.style.display = "flex"
		}
	} else {
		if (timesEl.style.display == "flex") {
			timesEl.style.display = "none"
		}
	}
}

function DelUnlockEl(target) {
	let topEl = target.parentElement.parentElement
	let parentEl = target.parentElement
	if (parentEl == topEl.firstElementChild) {
		parentEl.children[1].value = "名称"
		parentEl.children[2].value = ""
		parentEl.children[3].value = ""
	} else {
		topEl.removeChild(parentEl)
	}
}

function AddUnlockEl(target) {
	let topEl = target.parentElement.parentElement
	let parentEl = target.parentElement
	let index = Array.from(topEl.children).indexOf(parentEl)
	let newEl = CreateUnlockEl()
	if (parentEl != topEl.lastChild) {
		topEl.insertBefore(newEl, topEl.children[index + 1])
	} else {
		topEl.appendChild(newEl)
	}
}

function CreateUnlockEl(unlockName = "", unlockId = 0, unlockStack = 0) {
	let newEl = document.createElement("div")
	newEl.classList.add("input-group")
	newEl.classList.add("input-group-sm")
	newEl.innerHTML = `<input type="text" class="form-control" placeholder="名称" onchange="ChangeUnlockName(this)" title="常用：骷髅王后、肉后、花后、石后、月后、一王后、击败猪龙鱼公爵、渔夫任务">
	<input type="number" min="-5354" max="-1" class="form-control" placeholder="id" onchange="ChangeUnlockId(this)">
	<input type="number" min="1" max="200" class="form-control" placeholder="次数" title="需要完成多少次渔夫任务才解锁" style="display: none">
	<button class="btn btn-outline-secondary input-control" onclick="DelUnlockEl(this)">-</button>
	<button class="btn btn-outline-secondary input-control" onclick="AddUnlockEl(this)">+</button>`
	if (unlockId != 0) {
		newEl.children[0].value = GetUnlockNameById(unlockId)
		newEl.children[1].value = unlockId
	}
	if (unlockName != "") {
		newEl.children[0].value = unlockName
		let tempId = GetUnlockIdByName(unlockName)
		if (tempId != 0) {
			newEl.children[1].value = tempId
		}
	}
	if (unlockStack != 0) newEl.children[2].value = unlockStack
	return newEl
}
//#endregion

// #region 通用方法
// 清空子元素
function ClearChild(htmlEl) {
	while (htmlEl.children.length > 0) {
		htmlEl.removeChild(htmlEl.lastChild)
	}
}
// 清空画板
function ClearCanvas(imgEl) {
	imgEl.getContext('2d').clearRect(0, 0, imgEl.width, imgEl.height)
}


// 获得一条解锁条件描述
function GetUnlockName(data) {
	let nameStr = data.hasOwnProperty("name") ? data["name"] : ""
	return `${nameStr}`
}
function ValueToInt(value) {
	let newValue = parseInt(value)
	if (!isNaN(newValue))
		return newValue
	return 0
}
// #endregion


// #region 精灵图绘制
function InitSpriteEl() {
	itemsPngReady = false
	itemsPngTodo = []
	itemsPngEl = document.createElement('img')

	buffsPngReady = false
	buffsPngTodo = []
	buffsPngEl = document.createElement('img')
}

// 获得一个商品的名称（[序号].[icon][物品名][数量]）
function FillItemName(data, parentEl, sn = 0, beforeStr = "", afterStr = "") {
	let nameStr = data.hasOwnProperty("name") ? data["name"] : ""
	let id = data.hasOwnProperty("id") ? data["id"] : 0
	if (nameStr === "" && id != 0) {
		nameStr = GetItemName(id)
	}
	if (nameStr != "" && id == 0) {
		id = GetIdByName(nameStr)
	}

	let iconEl = document.createElement("canvas")
	iconEl.width = 16
	iconEl.height = 16
	SetItemIcon(id, iconEl)

	let stack = data.hasOwnProperty("stack") ? data["stack"] : 0
	let stackStr = stack > 1 ? ` x${stack}` : ""

	let prefixStr = ""
	if (data.hasOwnProperty("prefix")) {
		let prefix = data["prefix"]
		let prefixInt = parseInt(data["prefix"])
		let index = -1
		if (!isNaN(prefixInt)) {
			index = prefixInt - 1
		} else {
			index = prefixNames.indexOf(prefix)
		}
		if (index != -1) {
			prefixStr = prefixNames[index] + " "
		}
	}

	let iconBeforeEl = document.createElement("span")
	let iconAfterEl = document.createElement("span")
	iconBeforeEl.innerText = sn != 0 ? `${beforeStr}${sn}.` : beforeStr
	iconAfterEl.innerText = `${prefixStr}${nameStr}${stackStr}${afterStr}`

	let containerEl = document.createElement("span")
	containerEl.appendChild(iconBeforeEl)
	containerEl.appendChild(iconEl)
	containerEl.appendChild(iconAfterEl)
	parentEl.appendChild(containerEl)
}

// 物品图标
function SetItemIcon(id, iconEl) {
	ClearCanvas(iconEl)

	if (id == 0) {
		return
	}

	// 鱼店自定义的id（<0）
	id = GetCustomItemIcon(id)

	// 首次加载 items.png
	if (itemsPngEl.src == '') {
		itemsPngTodo.push(iconEl)
		itemsPngEl.onload = () => {
			itemsPngReady = true
			for (const el of itemsPngTodo) {
				if (el == '' || typeof (el) == 'undefined') continue
				DrawItemIcon(parseInt(el.dataset['id']), el)
			}
			delete itemsPngTodo
		}
		itemsPngEl.src = "img/items.png"
	}
	// 绘制图标
	if (!itemsPngReady) {
		iconEl.dataset['id'] = id
		itemsPngTodo.push(iconEl)
	} else {
		DrawItemIcon(id, iconEl)
	}
}
// 绘制物品图标到对应的画板
function DrawItemIcon(id, iconEl) {
	const info = itemsPngInfo[id.toString()]
	if (typeof (info) == 'undefined') {
		return
	}

	const max = iconEl.height
	let dX = 0, dY = 0, dW = 0, dH = 0
	if (info.w <= max && info.h <= max) {
		dW = info.w
		dH = info.h
		delete iconEl.style["image-rendering"]
	} else {
		let scale = Math.min(max / info.w, max / info.h)
		dW = Math.round(info.w * scale)
		dH = Math.round(info.h * scale)
		iconEl.style["image-rendering"] = "crisp-edges"
		// iconEl.style["image-rendering"] = "pixelated"
	}

	dX = Math.floor((max - dW) / 2)
	dY = Math.floor((max - dH) / 2)
	const ctx = iconEl.getContext('2d')
	ctx.clearRect(0, 0, iconEl.width, iconEl.height)
	ctx.drawImage(itemsPngEl, info.x, info.y, info.w, info.h, dX, dY, dW, dH)
}


// buff 图标
function SetBuffIcon(id, iconEl) {
	ClearCanvas(iconEl)
	if (id <= 0 || id > buffNames.length) {
		return
	}

	// 首次加载 buffs.png
	if (buffsPngEl.src == '') {
		buffsPngTodo.push(iconEl)
		buffsPngEl.onload = () => {
			buffsPngReady = true
			for (const el of buffsPngTodo) {
				if (el == '' || typeof (el) == 'undefined') continue
				DrawBuffIcon(parseInt(el.dataset['id']), el)
			}
			delete buffsPngTodo
		}
		buffsPngEl.src = "img/buffs.png"
	}

	if (!buffsPngReady) {
		iconEl.dataset['id'] = id
		buffsPngTodo.push(iconEl)
	} else {
		DrawBuffIcon(id, iconEl)
	}
}
// 绘制buff图标到对应的画板
function DrawBuffIcon(id, iconEl) {
	// buffs.png分割备注
	// 1、所有图片尺寸相同,都是 32px * 32px
	// 2、每行20张图片，由左向右，自上而下
	const imgW = 32
	const imgH = 32
	const rowNum = 20
	let imgX = (id - 1) % rowNum * imgW
	let imgY = Math.floor((id - 1) / rowNum) * imgH
	const ctx = iconEl.getContext('2d')
	ctx.clearRect(0, 0, iconEl.width, iconEl.height)
	ctx.drawImage(buffsPngEl, imgX, imgY, imgW, imgH, 0, 0, iconEl.width, iconEl.height)
}
// #endregion


// #region 名称、id等信息对照查询
// 获得物品名称
function GetItemName(id) {
	id = parseInt(id)
	if (id > 0) {
		if (id <= itemNames.length) {
			return itemNames[id - 1]
		}
	} else {
		let data = GetSettingsObj(id)
		if (data.hasOwnProperty("name"))
			return data["name"]
	}
	return ""
}

// 已知的物品名
function GetIdByName(itemName) {
	for (let i = 0; i < itemNames.length; i++) {
		const tempStr = itemNames[i];
		if (tempStr == itemName) {
			return (i + 1);
		}
	}

	switch (itemName) {
		case "铜币": case "铜": return 71
		case "银币": case "银": return 72
		case "金币": case "金": return 73
		case "铂金币": case "铂金": case "铂": return 74
	}

	let data = GetSettingsObjByName(itemName)
	if (data.hasOwnProperty("id"))
		return data["id"]

	return 0
}

// 获得解锁条件对应的id
function GetUnlockIdByName(unlockName) {
	for (const obj of unlockObjs) {
		if (obj.name == unlockName) {
			return obj.id
		}
	}
	return 0
}
function GetUnlockNameById(id) {
	for (const obj of unlockObjs) {
		if (obj.id == id) {
			return obj.name
		}
	}

	let killNpcId = -2000 - NpcCount
	let aliveNpcId = -3000 - NpcCount
	let curId = 0;
	if (id < -2000 && id >= -killNpcId) {
		curId = id + 2000
		if (curId < NpcCount) {

		}
	}
	if (id < -3000 && id >= -aliveNpcId) {
		curId = id + 3000
		if (curId < NpcCount) {

		}
	}

	return ""
}

// 商品id匹配物品id（图标）
function GetCustomItemIcon(id) {
	let data = GetSettingsObj(id)
	if (data.hasOwnProperty("icon"))
		return data["icon"]
	else
		return id
}

function GetSettingsObj(id) {
	// if (typeof (settingsJson["shopItem"]) == 'undefined') {
	// 	return {}
	// }
	// for (let i = 0; i < settingsJson["shopItem"].length; i++) {
	// 	const e = settingsJson["shopItem"][i]
	// 	if (e["id"] == id) {
	// 		return e
	// 	}
	// }
	for (const el of settingsJson["shopItem"]) {
		if (el["id"] == id) return el
	}
	return {}
}

function GetSettingsObjByName(sName) {
	for (const el of settingsJson["shopItem"]) {
		if (el["name"] == sName) return el
	}
	return {}
}



// 获得buff名称
function GetBuffName(id) {
	if (id != 0 && id <= buffNames.length) {
		return buffNames[id - 1]
	}
	return ""
}
// 根据buff名称识别buffid
function GetBuffIDByName(buffName) {
	let index = buffNames.indexOf(buffName)
	return index + 1
}
// #endregion

// 生成测试数据
function CreateTestData() {
	configJson = {
		"name": "鱼店",
		"pageSlots": 2000,
		"rowSlots": 5,
		"unlock": [],
		"comment": "鱼店速查：https://shimo.im/sheets/gO3oxEZL0zuyDyqD/y0PPl",
		"shop": [
			{ "name": "吸血鬼刀", "id": 1569, "prefix": "传奇", "allowGroup": ["战士", "vip"], "limit": 1, "serverLimit": 3, "unlock": [{ "name": "花后" }], "cost": [{ "name": "铂", "stack": 30 }] },
			{ "name": "吸血鬼刀", "id": 1569, "prefix": "虚幻", "allowGroup": ["战士", "vip"], "limit": 1, "serverLimit": 3, "unlock": [{ "name": "花后" }], "cost": [{ "name": "铂", "stack": 30 }] },
			{ "name": "who", "id": -160, "cmds": ["/who", "/help"], "unlock": [{ "name": "击败世吞" }], "cost": [{ "name": "金", "stack": 1 }] },
			{ "name": "金钟罩", "id": -159, "buffs": [25, 14, 117, 113, 115, 114], "seconds": [600, 600, 600, 600, 600, 600], "comment": "获得10分钟 踉跄、荆棘、生命力、耐力、暴怒、怒气 buff", "cost": [{ "name": "金", "stack": 10 }] },
			{ "name": "蠕虫罐头", "id": 4345, "stack": 10, "unlock": [{ "name": "渔夫在场" }], "cost": [{ "name": "金", "stack": 10 }] },
			{ "name": "", "id": 29, "unlock": [{ "name": "肉后" }, { "name": "生命<400" }], "cost": [{ "name": "金", "stack": 2 }] },
			{ "name": "生命水晶", "id": 29, "unlock": [], "comment": "有人下地淘金，有人在家淘气", "cost": [{ "name": "煤", "id": 1922 }] },
			{ "name": "生命水晶", "id": 29, "stack": 2, "cost": [{ "name": "天使雕像", "id": 52 }] },
			{ "name": "生命果", "id": 1291, "unlock": [{ "name": "花后" }], "cost": [{ "name": "金", "stack": 3 }] },
			{ "name": "墓石碑", "id": 1173, "cost": [{ "name": "海草", "id": 2338 }] },

			{ "name": "眼骨", "id": 5098, "unlock": [{ "name": "鹿角怪" }], "cost": [{ "name": "钱币槽", "id": 3213 }, { "name": "金", "stack": 50 }] },
			{ "name": "无底水桶", "id": 3031, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "金", "stack": 20 }] },
			{ "name": "超级吸水棉", "id": 3032, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "金", "stack": 10 }] },
			{ "name": "熔岩吸收棉", "id": 4872, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "金", "stack": 40 }] },
			{ "name": "每秒伤害计数器", "id": 3119, "unlock": [{ "name": "击败骷髅王" }], "cost": [{ "name": "铂" }] },
			{ "name": "生命体分析机", "id": 3118, "unlock": [{ "name": "击败骷髅王" }], "cost": [{ "name": "铂" }] },
			{ "name": "秒表", "id": 3099, "unlock": [{ "name": "击败骷髅王" }], "cost": [{ "name": "铂" }] },
			{ "name": "雷达", "id": 3084, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "铂" }] },
			{ "name": "渔民袖珍宝典", "id": 3120, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "铂" }] },
			{ "name": "天气收音机", "id": 3037, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "铂" }] },
			{ "name": "六分仪", "id": 3096, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "铂" }] },
			{ "name": "优质钓鱼线", "id": 2373, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "铂" }] },
			{ "name": "渔夫耳环", "id": 2374, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "铂" }] },

			{ "name": "钓具箱", "id": 2375, "unlock": [{ "name": "肉后" }], "cost": [{ "name": "铂" }] }
		]
	}
}
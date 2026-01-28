document.getElementById("versionText").innerText = "版本： v104 20260123"

// 集合1
const itemCollections = [
	{ name: "桶", ids: "205,206,207,1128,3031,4820,5302,5364,3032,4872,5303,5304,4827,4824,4825,4826" },

	{ name: "工具...", ids: "3061,3611, 4056, 5324,5329,5330,3485,2176,5295,367,5335,3183 " },
	{ name: "微光...", ids: "5337,5339,5338,5342,5341, 5340,5336,5343, 5335,5134,5364,5348,1007, 5380, 5347,5353,5357,5362, 5381,5355,5128,5427,5408,5374, " },

	{ name: "召唤物", ids: "560,43,70,1331,1133,5120,4988,556,544,557,5334,1293,2673,3601,267,4271,361,1315,2767,602,1844,1958" },
	{ name: "宝藏袋", ids: "3318,3319,3320,3321,3322,3323,3324,3325,3326,3327,4957, 3328,3329,3330,3331,3332,3860,4782,5111,3861,3862" },
	{ name: "永久增强", ids: "29,1291,109,3335,4382,5336,5326,5043,5337,5338,5339,5342,5341,5340,5343,5289" },

	{ name: "渔业...", ids: "2367,2368,2369, 2373,2374,2375,3721,4881,5064, 5139,4608, 2354,2355,2356, 4404,5341,3120,3037,3096,3036, 2289,2291,2293,2421,4442,4325,2292,2295,2296,2422,2294, 3183,358 " },
	{ name: "任务鱼", ids: "2450,2451,2452,2453,2454,2455,2456,2457,2458,2459,2460,2461,2462,2463,2464,2465,2466,2467,2468,2469,2470,2471,2472,2473,2474,2475,2476,2477,2478,2479,2480,2481,2482,2483,2484,2485,2486,2487,2488,4393,4394" },
	{ name: "宝匣", ids: "2334,2335,2336,3203,3204,3205,3206,3207,3208,4405,3979,3980,3981,3982,3983,3984,3985,3986,3987,4406,4407,4408,4877,4878,5002,5003" },
	{ name: "宝石", ids: "999,182,178,179,177,180,181,  3643,1527,1526,1525,1524,1523,1522" },

	{ name: "一级饱食", ids: "967,969,2425,4009,4014,4024,4030,4031,4033,4282,4283,4284,4285,4286,4287,4289,4290,4291,4292,4293,4294,4295,4296,4411,4614,4616,4617,4618,4619,4620,4621,4622,4624,4625,5009,5041,5275,5277,5278" },
	{ name: "二级饱食", ids: "357,1787,2267,2268,2426,2427,3195,4012,4016,4017,4018,4019,4020,4021,4023,4026,4028,4032,4034,4035,4288,4297,4403,4623,5042,5092,5093" },
	{ name: "三级饱食", ids: "1911,1919,1920,3532,4011,4013,4015,4022,4025,4027,4029,4036,4037,4615" },


	{ name: "天顶剑", ids: "3507,989,1123,65,3018,1826,2880,3065,3063,757,  190,155,121,46,795,273,675, 368,674, 4956" },
	{ name: "手机", ids: "17,18,393,395, 3084,3095,3118,3122,  3119,3099,3102,3121, 3120,3037,3096,3036, 3123, 50,3199, 3124, 4263,4819, 5358" },
	{ name: "开发者物品", ids: "1566,1567,1568, 3368,3921,3922,3923,3924, 1554,1555,1556,1586,1587,1588, 1557,1558,1559,1585, 1580,1581,1582,1583, 1563,1564,1565,3582, 3226,3227,3228,3288, 3925,3926,3927,3928,3929, 3589,3590,3591,3592,3599, 665,666,667,668,3287, 3585,3586,3587,3588,3024, 1560,1561,1562,1584, 3583,3578,3579,3580,3581, 4755,4756,4757,4754, 4751,4752,4753,4750, 4747,4748,4749,4746, 4732,4733,4734,4730" },

	{ name: "泰拉靴", ids: "54,128,1579,3200,4055, 285,405,212, 898,950, 1862,908, 906,193,4038,1323,863,907,1322, 4004,5000" },
	{ name: "鞋", ids: "128,54,1579,3200,4055,405,898,950,1862,863,907,908,3017,3990,3993,4822,4874,5000" },

	{ name: "制作站", ids: "36,32,34,2827,354,33,221,35,716,3000,363,332,345,1791,398,1430,1120,2172,525,1220,524,1221,487,1551,3549,352,5008,995,996,2192,2194,2204,2198,2196,2197,998,4142,2193,2203,2195,966,997,5296" },
	{ name: "团队", ids: "3621,3633,3634,3635,3636,3637,3622,3638,3639,3640,3641,3642,1969,1982" },
	{ name: "模特", ids: "3202,498,1989,3977,2699,3270" },
	{ name: "银行", ids: "87,3213,5098,346,3813,4076,4131,5325" },
	{ name: "磁铁", ids: "2219,5010" },
];

// 职业集合
const classCollections = [
	{ name: "召唤-鞭子", ids: "4672,4913,5074, 4912,4911,4678,4680,4679,4914" },
	{ name: "召唤-仆从", ids: "1802,4758,1309,4273,2749,5069,2365,3531,3474,2621,4607,5005,2584,1157,3249,2551,4269,5114,4281,2535,2364" },
	{ name: "召唤-哨兵", ids: "3571,1572,3824,3825,3826,3569,3832,3833,3834,3818,3819,3820,5119,2366,3829,3830,3831" },
	{ name: "坐骑", ids: "2430,2502,2491,2428,4791,4264,4716,4785,4786,4787,4828,   3771,5130,3260,2429,4981,1914,2771,2769,4444,3367,2768,4796,4795,4792,4793,4794 " },
];

// 水友专属集合
const friendCollections = [
	{ name: "🕷 hf 🕷", ids: "4444,3611,4269,4761,4563,2493,5098, 4955, 5007, 5099, 4797, 4747,4748,4749,4746, 4989,4954,4811" },
	{ name: "🐽 mz 🦈", ids: "2673, 2498,2499,2500" },
	{ name: "🫙 mix 🏹", ids: "987,2161,1358" },
	{ name: "🚁 cart", ids: "5215,4021,4016,4029,5275,4015,4036,4030, 5451" },
	{ name: "🐶 狗头", ids: "1254,1858,5215,1338,1299" },
	{ name: "⭐ star", ids: "3061,3611,5335" },
];
// ID范围配置
const idRanges = [
	{ start: 5456, end: 6144 },
	{ start: 5001, end: 5455 },
	{ start: 4001, end: 5000 },
	{ start: 3001, end: 4000 },
	{ start: 2001, end: 3000 },
	{ start: 1001, end: 2000 },
	{ start: 1, end: 1000 },
];

// 特殊物品别名映射：别名 -> 物品ID数组
// 当输入匹配这些别名时，会额外显示对应的物品
const itemAliases = [
	{ name: "磁铁", ids: "2219,5010" },
	{ name: "翱翔", ids: "4989,4954" },
	{ name: "宏伟蓝图", ids: "3611" },
];

// ------

// Buff ID范围配置
const buffIdRanges = [
	{ start: 1, end: 201 },
	{ start: 201, end: 400 },
];

// 初始化页面
function initSearchPage() {
	const searchInput = document.getElementById('searchInput');
	const searchBtn = document.getElementById('searchBtn');
	const clearBtn = document.getElementById('clearBtn');
	const searchResults = document.getElementById('searchResults');
	const resultCount = document.getElementById('resultCount');
	const copyToast = document.getElementById('copyToast');
	const searchType = document.getElementById('searchType');
	const titleEl = document.querySelector('h3');
	const collectionSelect = document.getElementById('collectionSelect');
	const rangeSelect = document.getElementById('rangeSelect');
	const classSelect = document.getElementById('classSelect');
	const friendSelect = document.getElementById('friendSelect');
	const copyButtons = document.getElementById('copyButtons');
	const buffRangeSelect = document.getElementById('buffRangeSelect');
	const buffRangeSelectGroup = document.getElementById('buffRangeSelectGroup');
	const copyAll = document.getElementById('copyAll');
	const copyIds = document.getElementById('copyIds');
	const copyNames = document.getElementById('copyNames');

	// 保存当前搜索结果，供复制使用
	let currentResults = [];

	// 任务鱼物品ID集合（需要从 data.js 中获取）
	const taskFishIds = typeof taskFishItemNetIDs !== 'undefined' ? taskFishItemNetIDs.split(',') : [];

	// 动态生成特殊集合选项
	populateCollectionOptions(collectionSelect);

	// 动态生成ID范围选项
	populateRangeOptions(rangeSelect);

	// 动态生成职业集合选项
	populateClassOptions(classSelect);

	// 动态生成水友专属集合选项
	populateFriendOptions(friendSelect);

	// 动态生成Buff ID范围选项
	populateBuffRangeOptions(buffRangeSelect);

	let searchTimeout = null;
	let itemsPngEl = new Image();
	let itemsPngReady = false;
	let itemsPngTodo = [];
	let buffsPngEl = new Image();
	let buffsPngReady = false;
	let buffsPngTodo = [];

	// 初始化物品图标裁剪信息
	if (typeof itemsPngInfo === 'undefined' && typeof itemCropArr !== 'undefined') {
		itemsPngInfo = {};
		const arr = itemCropArr.split('~');
		for (let i = 0; i < arr.length; i++) {
			const parts = arr[i].split(',');
			itemsPngInfo[i + 1] = {
				x: parseInt(parts[1]),
				y: parseInt(parts[2]),
				w: parseInt(parts[3]),
				h: parseInt(parts[4])
			};
		}
	}

	// 清空画布
	function ClearCanvas(iconEl) {
		if (typeof (iconEl) == 'undefined' || iconEl == '') {
			return
		}
		const ctx = iconEl.getContext('2d');
		ctx.clearRect(0, 0, iconEl.width, iconEl.height);
	}

	// 设置物品图标
	function SetItemIcon(id, iconEl) {
		ClearCanvas(iconEl);

		if (id == 0) {
			return;
		}

		// 首次加载 items.png
		if (itemsPngEl.src == '') {
			itemsPngTodo.push(iconEl);
			itemsPngEl.onload = () => {
				itemsPngReady = true;
				for (const el of itemsPngTodo) {
					if (el == '' || typeof (el) == 'undefined') continue;
					DrawItemIcon(parseInt(el.dataset['id']), el);
				}
				delete itemsPngTodo;
			};
			itemsPngEl.src = "img/items.png";
		}

		// 绘制图标
		if (!itemsPngReady) {
			iconEl.dataset['id'] = id;
			itemsPngTodo.push(iconEl);
		} else {
			DrawItemIcon(id, iconEl);
		}
	}

	// 绘制物品图标到对应的画板
	function DrawItemIcon(id, iconEl) {
		const info = itemsPngInfo[id.toString()];
		if (typeof (info) == 'undefined') {
			return;
		}

		const max = iconEl.height;
		// 始终等比放大到画布大小
		let scale = Math.min(max / info.w, max / info.h);
		let dW = Math.round(info.w * scale);
		let dH = Math.round(info.h * scale);
		let dX = Math.floor((max - dW) / 2);
		let dY = Math.floor((max - dH) / 2);

		const ctx = iconEl.getContext('2d');

		// 使用邻近插值算法（nearest-neighbor）进行缩放，保持像素风格
		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;

		ctx.clearRect(0, 0, iconEl.width, iconEl.height);
		ctx.drawImage(itemsPngEl, info.x, info.y, info.w, info.h, dX, dY, dW, dH);
	}

	// 获取物品图标canvas
	function getItemIconCanvas(itemId) {
		const canvas = document.createElement('canvas');
		canvas.width = 72;
		canvas.height = 72;
		canvas.className = 'item-icon';
		SetItemIcon(itemId, canvas);
		return canvas;
	}

	// 设置buff图标
	function SetBuffIcon(id, iconEl) {
		ClearCanvas(iconEl);
		if (id <= 0 || id > buffNames.length) {
			return;
		}

		// 首次加载 buffs.png
		if (buffsPngEl.src == '') {
			buffsPngTodo.push(iconEl);
			buffsPngEl.onload = () => {
				buffsPngReady = true;
				for (const el of buffsPngTodo) {
					if (el == '' || typeof (el) == 'undefined') continue;
					DrawBuffIcon(parseInt(el.dataset['id']), el);
				}
				delete buffsPngTodo;
			};
			buffsPngEl.src = "img/buffs.png";
		}

		if (!buffsPngReady) {
			iconEl.dataset['id'] = id;
			buffsPngTodo.push(iconEl);
		} else {
			DrawBuffIcon(id, iconEl);
		}
	}

	// 绘制buff图标到对应的画板
	function DrawBuffIcon(id, iconEl) {
		// buffs.png分割备注
		// 1、所有图片尺寸相同,都是 32px * 32px
		// 2、每行20张图片，由左向右，自上而下
		const imgW = 32;
		const imgH = 32;
		const rowNum = 20;
		let imgX = (id - 1) % rowNum * imgW;
		let imgY = Math.floor((id - 1) / rowNum) * imgH;

		// 缩放到画布大小
		const max = iconEl.height;
		let dW = max;
		let dH = max;
		let dX = 0;
		let dY = 0;

		const ctx = iconEl.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;

		ctx.clearRect(0, 0, iconEl.width, iconEl.height);
		ctx.drawImage(buffsPngEl, imgX, imgY, imgW, imgH, dX, dY, dW, dH);
	}

	// 获取buff图标canvas
	function getBuffIconCanvas(buffId) {
		const canvas = document.createElement('canvas');
		canvas.width = 72;
		canvas.height = 72;
		canvas.className = 'item-icon';
		SetBuffIcon(buffId, canvas);
		return canvas;
	}

	// 执行搜索
	function performSearch() {
		const query = searchInput.value.trim().toLowerCase();
		const isBuffSearch = searchType.value === 'buff';
		const collectionValue = collectionSelect.value;
		const rangeValue = rangeSelect.value;
		const classValue = classSelect.value;
		const friendValue = friendSelect.value;
		const buffRangeValue = buffRangeSelect.value;

		// Buff范围查询模式
		if (buffRangeValue && isBuffSearch) {
			const range = buffRangeValue.substring(10).split('-');
			const start = parseInt(range[0]);
			const end = parseInt(range[1]);
			let results = [];
			for (let id = start; id <= end && id <= buffNames.length; id++) {
				results.push({ id: id, name: buffNames[id - 1] || '(未命名)' });
			}

			// 如果有搜索关键词，进行过滤
			if (query) {
				const isNumericQuery = /^\d+$/.test(query);
				results = results.filter(item => {
					if (isNumericQuery) {
						return item.id.toString().startsWith(query);
					} else {
						return item.name.toLowerCase().includes(query);
					}
				});
			}

			displayResults(results, query, query ? /^\d+$/.test(query) : false, isBuffSearch);
			return;
		}

		// 如果选择了集合但不是buff模式
		if ((collectionValue || rangeValue || classValue || friendValue) && isBuffSearch) {
			searchResults.innerHTML = `<div class="no-results">集合查询仅支持物品模式</div>`;
			resultCount.textContent = '';
			return;
		}

		// 集合查询模式
		if ((collectionValue || rangeValue || classValue || friendValue) && !isBuffSearch) {
			let ids = [];
			// 优先使用范围选择
			if (rangeValue) {
				const range = rangeValue.substring(6).split('-');
				const start = parseInt(range[0]);
				const end = parseInt(range[1]);
				for (let id = start; id <= end && id <= itemNames.length; id++) {
					ids.push(id);
				}
			} else if (friendValue) {
				ids = friendValue.split(',').map(id => parseInt(id.trim()));
			} else if (classValue) {
				ids = classValue.split(',').map(id => parseInt(id.trim()));
			} else if (collectionValue === 'taskFish') {
				ids = taskFishIds.map(id => parseInt(id.trim()));
			} else {
				ids = collectionValue.split(',').map(id => parseInt(id.trim()));
			}

			let results = [];
			for (const id of ids) {
				if (id > 0 && id <= itemNames.length) {
					results.push({ id: id, name: itemNames[id - 1] || '(未命名)' });
				}
			}

			// 如果有搜索关键词，进行过滤
			if (query) {
				const isNumericQuery = /^\d+$/.test(query);
				results = results.filter(item => {
					if (isNumericQuery) {
						return item.id.toString().startsWith(query);
					} else {
						return item.name.toLowerCase().includes(query);
					}
				});
			}

			displayResults(results, query, query ? /^\d+$/.test(query) : false, isBuffSearch);
			return;
		}

		if (!query) {
			searchResults.innerHTML = `<div class="no-results">请输入${isBuffSearch ? 'buff' : '物品'}名称或ID进行搜索</div>`;
			resultCount.textContent = '';
			return;
		}

		let results = [];
		let matchedAlias = null;
		// 判断是否为纯数字（ID查询）
		const isNumericQuery = /^\d+$/.test(query);

		// 检查别名映射（仅物品模式）
		if (!isBuffSearch && !isNumericQuery) {
			for (const { name, ids } of itemAliases) {
				if (query.includes(name) || name.includes(query)) {
					matchedAlias = ids;
					break;
				}
			}
		}

		if (isBuffSearch) {
			// Buff查询
			if (isNumericQuery) {
				const targetId = parseInt(query);
				for (let i = 0; i < buffNames.length; i++) {
					const buffId = i + 1;
					if (buffId === targetId || buffId.toString().startsWith(query)) {
						results.push({ id: buffId, name: buffNames[i] || '(未命名)' });
					}
				}
			} else {
				for (let i = 0; i < buffNames.length; i++) {
					const buffName = buffNames[i];
					if (buffName && buffName.toLowerCase().includes(query)) {
						results.push({ id: i + 1, name: buffName });
					}
				}
			}
		} else {
			// 物品查询
			if (isNumericQuery) {
				const targetId = parseInt(query);
				for (let i = 0; i < itemNames.length; i++) {
					const itemId = i + 1;
					if (itemId === targetId || itemId.toString().startsWith(query)) {
						results.push({ id: itemId, name: itemNames[i] || '(未命名)' });
					}
				}
			} else {
				// 使用 Set 避免重复结果
				const resultIds = new Set();

				// 如果匹配到别名，先添加别名对应的物品
				if (matchedAlias) {
					const ids = matchedAlias.split(',').map(id => parseInt(id.trim()));
					for (const id of ids) {
						if (id > 0 && id <= itemNames.length) {
							resultIds.add(id);
						}
					}
				}

				// 正常的名称匹配搜索
				for (let i = 0; i < itemNames.length; i++) {
					const itemName = itemNames[i];
					if (itemName && itemName.toLowerCase().includes(query)) {
						resultIds.add(i + 1);
					}
				}

				// 转换为结果数组并按ID排序
				results = Array.from(resultIds)
					.sort((a, b) => a - b)
					.map(id => ({ id: id, name: itemNames[id - 1] || '(未命名)' }));
			}
		}

		displayResults(results, query, isNumericQuery, isBuffSearch);
	}

	// 显示搜索结果
	function displayResults(results, query, isNumericQuery, isBuffSearch) {
		// 保存当前结果供复制使用
		currentResults = results;

		if (results.length === 0) {
			searchResults.innerHTML = `<div class="no-results">未找到匹配的${isBuffSearch ? 'buff' : '物品'}</div>`;
			resultCount.textContent = '找到 0 个结果';
			copyButtons.style.display = 'none';
			return;
		}

		// 显示复制按钮
		copyButtons.style.display = 'flex';

		// 高亮匹配的文字
		function highlightMatch(text, query) {
			const index = text.toLowerCase().indexOf(query);
			if (index === -1) return text;
			return text.substring(0, index) +
				'<mark>' + text.substring(index, index + query.length) + '</mark>' +
				text.substring(index + query.length);
		}

		// 高亮匹配的ID
		function highlightId(id, query) {
			const idStr = id.toString();
			const index = idStr.indexOf(query);
			if (index === -1) return idStr;
			return idStr.substring(0, index) +
				'<mark>' + idStr.substring(index, index + query.length) + '</mark>' +
				idStr.substring(index + query.length);
		}

		let html = '';
		results.forEach(item => {
			const displayId = isNumericQuery ? highlightId(item.id, query) : item.id;
			const displayName = isNumericQuery ? item.name : highlightMatch(item.name, query);
			// 只有物品名称添加点击事件，buff 不添加
			const nameClickAttr = isBuffSearch ? '' : ` onclick="openWiki('${item.name.replace(/'/g, "\\'")}' )"`;
			const nameClass = isBuffSearch ? 'item-name buff-name' : 'item-name';
			html += `
				<div class="result-item">
					<div class="item-icon" data-item-id="${item.id}"></div>
					<div class="item-id" onclick="copyItemId(${item.id})">${displayId}</div>
					<div class="${nameClass}"${nameClickAttr}>${displayName}</div>
				</div>
			`;
		});

		searchResults.innerHTML = html;
		resultCount.textContent = `找到 ${results.length} 个结果`;

		// 延迟加载图标
		setTimeout(() => {
			document.querySelectorAll('.item-icon[data-item-id]').forEach(iconEl => {
				const itemId = parseInt(iconEl.dataset.itemId);
				const canvas = isBuffSearch ? getBuffIconCanvas(itemId) : getItemIconCanvas(itemId);
				// 为物品图标添加点击下载事件
				canvas.style.cursor = 'pointer';
				if (isBuffSearch) {
					canvas.addEventListener('click', () => downloadBuffIcon(itemId));
				} else {
					canvas.addEventListener('click', () => downloadItemIcon(itemId));
				}
				iconEl.parentNode.replaceChild(canvas, iconEl);
			});
		}, 100);
	}

	// 下载物品图标（缩放10倍）
	function downloadItemIcon(itemId) {
		const info = itemsPngInfo[itemId.toString()];
		if (!info || !itemsPngReady) return;

		// 创建新的canvas用于导出
		const exportCanvas = document.createElement('canvas');
		const scale = 10;
		exportCanvas.width = info.w * scale;
		exportCanvas.height = info.h * scale;

		const ctx = exportCanvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;

		// 绘制缩放后的图像
		ctx.drawImage(itemsPngEl, info.x, info.y, info.w, info.h, 0, 0, exportCanvas.width, exportCanvas.height);

		// 获取物品名称
		const itemName = itemNames[itemId - 1] || 'unknown';

		// 转换为blob并下载
		exportCanvas.toBlob((blob) => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `Item_${itemId}-${itemName}.png`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}, 'image/png');
	}

	// 下载buff图标（缩放10倍）
	function downloadBuffIcon(buffId) {
		if (!buffsPngReady) return;

		// buffs.png分割备注
		// 1、所有图片尺寸相同,都是 32px * 32px
		// 2、每行20张图片，由左向右，自上而下
		const imgW = 32;
		const imgH = 32;
		const rowNum = 20;
		let imgX = (buffId - 1) % rowNum * imgW;
		let imgY = Math.floor((buffId - 1) / rowNum) * imgH;

		// 创建新的canvas用于导出
		const exportCanvas = document.createElement('canvas');
		const scale = 10;
		exportCanvas.width = imgW * scale;
		exportCanvas.height = imgH * scale;

		const ctx = exportCanvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;

		// 绘制缩放后的图像
		ctx.drawImage(buffsPngEl, imgX, imgY, imgW, imgH, 0, 0, exportCanvas.width, exportCanvas.height);

		// 获取buff名称
		const buffName = buffNames[buffId - 1] || 'unknown';

		// 转换为blob并下载
		exportCanvas.toBlob((blob) => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `Buff_${buffId}-${buffName}.png`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}, 'image/png');
	}

	// 事件监听
	searchInput.addEventListener('input', () => {
		// 控制清除按钮显示/隐藏
		clearBtn.style.display = searchInput.value ? 'block' : 'none';
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(performSearch, 300);
	});

	searchInput.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			performSearch();
		}
	});

	searchBtn.addEventListener('click', performSearch);

	// 清除按钮点击事件
	clearBtn.addEventListener('click', () => {
		searchInput.value = '';
		collectionSelect.value = '';
		rangeSelect.value = '';
		classSelect.value = '';
		friendSelect.value = '';
		buffRangeSelect.value = '';
		clearBtn.style.display = 'none';
		document.body.style.backgroundColor = '#549EE6';
		performSearch();
	});

	// 切换查询类型
	searchType.addEventListener('change', () => {
		const copyButtons = document.getElementById('copyButtons');
		const filterSelectsGroup = document.getElementById('filterSelectsGroup');
		if (searchType.value === 'item') {
			titleEl.textContent = '物品ID查询';
			searchInput.placeholder = '输入物品名称或ID进行查询...';
			filterSelectsGroup.style.display = 'flex';
			buffRangeSelectGroup.style.display = 'none';
		} else {
			titleEl.textContent = 'Buff ID查询';
			searchInput.placeholder = '输入buff名称或ID进行查询...';
			filterSelectsGroup.style.display = 'none';
			buffRangeSelectGroup.style.display = 'flex';
			collectionSelect.value = '';
			rangeSelect.value = '';
			classSelect.value = '';
			friendSelect.value = '';
			buffRangeSelect.value = '';
			// 隐藏复制按钮
			copyButtons.style.display = 'none';
		}
		performSearch();
	});

	// 集合选择变化时自动搜索
	collectionSelect.addEventListener('change', () => {
		rangeSelect.value = '';
		classSelect.value = '';
		friendSelect.value = '';
		clearBtn.style.display = 'none';
		// 检查是否选中"开发者物品"
		if (collectionSelect.options[collectionSelect.selectedIndex].text === '开发者物品') {
			document.body.style.backgroundColor = '#D278E0';
		} else {
			document.body.style.backgroundColor = '#549EE6';
		}
		performSearch();
	});

	// ID范围选择变化时自动搜索
	rangeSelect.addEventListener('change', () => {
		collectionSelect.value = '';
		classSelect.value = '';
		friendSelect.value = '';
		clearBtn.style.display = 'none';
		document.body.style.backgroundColor = '#549EE6';
		performSearch();
	});

	// 职业选择变化时自动搜索
	classSelect.addEventListener('change', () => {
		collectionSelect.value = '';
		rangeSelect.value = '';
		friendSelect.value = '';
		clearBtn.style.display = 'none';
		document.body.style.backgroundColor = '#549EE6';
		performSearch();
	});

	// 水友选择变化时自动搜索
	friendSelect.addEventListener('change', () => {
		collectionSelect.value = '';
		rangeSelect.value = '';
		classSelect.value = '';
		clearBtn.style.display = 'none';
		// 检查是否选中"hf"
		if (friendSelect.options[friendSelect.selectedIndex].text.includes('hf')) {
			document.body.style.backgroundColor = '#B0A18F';
		} else if (friendSelect.options[friendSelect.selectedIndex].text.includes('mz')) {
			document.body.style.backgroundColor = '#46955C';
		} else if (friendSelect.options[friendSelect.selectedIndex].text.includes('star')) {
			document.body.style.backgroundColor = '#701844';
		} else if (friendSelect.options[friendSelect.selectedIndex].text.includes('mix')) {
			document.body.style.backgroundColor = '#535B4E';
		} else if (friendSelect.options[friendSelect.selectedIndex].text.includes('高压电击')) {
			document.body.style.backgroundColor = '#B39135';
		} else {
			document.body.style.backgroundColor = '#549EE6';
		}
		performSearch();
	});

	// Buff范围选择变化时自动搜索
	buffRangeSelect.addEventListener('change', () => {
		clearBtn.style.display = 'none';
		document.body.style.backgroundColor = '#549EE6';
		performSearch();
	});

	// 复制所有结果（格式：id 名字）
	copyAll.addEventListener('click', (e) => {
		e.preventDefault();
		const text = currentResults.map(item => `${item.id} ${item.name}`).join(', ');
		navigator.clipboard.writeText(text).then(() => {
			const toast = new bootstrap.Toast(copyToast);
			toast.show();
		});
	});

	// 复制所有ID
	copyIds.addEventListener('click', (e) => {
		e.preventDefault();
		const text = currentResults.map(item => item.id.toString()).join(',');
		navigator.clipboard.writeText(text).then(() => {
			const toast = new bootstrap.Toast(copyToast);
			toast.show();
		});
	});

	// 复制所有名字
	copyNames.addEventListener('click', (e) => {
		e.preventDefault();
		const text = currentResults.map(item => item.name).join(',');
		navigator.clipboard.writeText(text).then(() => {
			const toast = new bootstrap.Toast(copyToast);
			toast.show();
		});
	});

	// 页面加载后聚焦输入框
	searchInput.focus();
}

// 动态生成特殊集合选项
function populateCollectionOptions(selectElement) {
	// 保留第一个默认选项
	selectElement.innerHTML = '<option value="">集合</option>';

	itemCollections.forEach(collection => {
		const option = document.createElement('option');
		option.value = collection.ids;
		option.textContent = collection.name;
		selectElement.appendChild(option);
	});
}

// 动态生成ID范围选项
function populateRangeOptions(selectElement) {
	// 保留第一个默认选项
	selectElement.innerHTML = '<option value="">ID范围</option>';

	idRanges.forEach(range => {
		const option = document.createElement('option');
		option.value = `range:${range.start}-${range.end}`;
		option.textContent = `${range.start}~${range.end}`;
		selectElement.appendChild(option);
	});
}

// 动态生成职业集合选项
function populateClassOptions(selectElement) {
	// 保留第一个默认选项
	selectElement.innerHTML = '<option value="">职业</option>';

	classCollections.forEach(collection => {
		const option = document.createElement('option');
		option.value = collection.ids;
		option.textContent = collection.name;
		selectElement.appendChild(option);
	});
}

// 动态生成水友专属集合选项
function populateFriendOptions(selectElement) {
	// 保留第一个默认选项
	selectElement.innerHTML = '<option value="">水友专属</option>';

	friendCollections.forEach(collection => {
		const option = document.createElement('option');
		option.value = collection.ids;
		option.textContent = collection.name;
		selectElement.appendChild(option);
	});
}

// 动态生成Buff ID范围选项
function populateBuffRangeOptions(selectElement) {
	// 保留第一个默认选项
	selectElement.innerHTML = '<option value="">ID范围</option>';

	buffIdRanges.forEach(range => {
		const option = document.createElement('option');
		option.value = `buffRange:${range.start}-${range.end}`;
		option.textContent = `${range.start}～${range.end}`;
		selectElement.appendChild(option);
	});
}

// 全局函数：复制物品ID
function copyItemId(id) {
	const copyToast = document.getElementById('copyToast');
	navigator.clipboard.writeText(id.toString()).then(() => {
		const toast = new bootstrap.Toast(copyToast);
		toast.show();
	});
}

// 全局函数：打开 Terraria Wiki
function openWiki(itemName) {
	const url = `https://terraria.wiki.gg/zh/wiki/${encodeURIComponent(itemName)}`;
	window.open(url, '_blank');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initSearchPage);

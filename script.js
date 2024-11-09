// 定义一个包含文件信息的数组
const images = [
    // js 类别
    { id: 1, name: 'calculator.min.js', version: '', description: '一个具有计算器功能的js库', url: 'JS/calculator.min.js', category: 'js' },
    { id: 2, name: 'deployggb.js', version: '', description: '在网页中嵌入 GeoGebra 图形', url: 'JS/deployggb.js', category: 'js' },
    { id: 3, name: 'echarts.min.js', version: '', description: 'ECharts 图表库的压缩版本', url: 'JS/echarts.min.js', category: 'js' },
    { id: 4, name: 'function-plot.js', version: '', description: '一个基于 D3.js 构建的用于绘制数学函数图像的 JavaScript 库', url: 'JS/function-plot.js', category: 'js' },
    { id: 5, name: 'numeric.min.js', version: '', description: '一个用于在 JavaScript 中进行数值计算的库', url: 'JS/numeric.min.js', category: 'js' },
    // apk 类别
    { id: 6, name: 'Aidea', version: '2.1.2', description: 'Yoseya 制作的第一款软件', url: 'apk/Aidea_2.1.2.apk', category: 'apk' },
    { id: 7, name: 'Aidea code', version: '1.0.4', description: 'Yoseya 的另一款作品，基于Aidea2.0 的精简版，专注脚本编写', url: 'apk/Aidea code_1.0.4.apk', category: 'apk' },
    // 更多文件...
];

// 按名称排序文件数组
images.sort((a, b) => a.name.localeCompare(b.name));

// 显示文件列表的函数
function displayImages(images) {
    const imageList = document.getElementById('imageList'); // 获取显示文件列表的元素
    imageList.innerHTML = ''; // 清空当前列表
    images.forEach(image => { // 遍历文件数组
        const li = document.createElement('li'); // 创建一个新的列表项
        li.className = 'image-item'; // 设置列表项的类名
        li.innerHTML = `
            <span class="image-name-version">${image.name} ${image.version}</span>
        `; // 设置列表项的内容

        // 创建描述弹出窗口
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = image.description;
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);

        // 添加鼠标悬停事件监听器
        li.addEventListener('mouseover', (e) => {
            tooltip.style.display = 'block';
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        });

        // 添加鼠标移出事件监听器
        li.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });

        li.addEventListener('touchend', () => {
            clearTimeout(touchTimeout);
            tooltip.style.display = 'none';
        });

        // 添加点击事件监听器
        li.addEventListener('click', (e) => {
            e.preventDefault(); // 防止默认行为
            window.location.href = image.url; // 点击后跳转到文件的URL
        });
        
        imageList.appendChild(li); // 将新的列表项添加到列表中
    });
}

// 搜索文件的函数
function searchImages() {
    const query = document.getElementById('searchInput').value.toLowerCase(); // 获取搜索输入框的值并转换为小写
    const filteredImages = images.filter(image =>
        image.name.toLowerCase().includes(query) || // 按名称搜索
        image.version.includes(query) || // 按版本号搜索
        image.description.toLowerCase().includes(query) // 按描述搜索
    );
    filterByCategory(filteredImages); // 过滤并显示结果
}

// 按类别过滤文件的函数
function filterByCategory(images = null) {
    const selectedCategory = document.getElementById('categorySelect').value; // 获取选中的类别
    let filteredImages = images || images.slice(); // 如果没有传入images，则使用全局的images数组
    if (selectedCategory) {
        filteredImages = filteredImages.filter(image => image.category === selectedCategory); // 按类别过滤
    }
    displayImages(filteredImages); // 显示过滤后的结果
}

// 处理键盘按键事件的函数
function handleKeyPress(event) {
    if (event.key === 'Enter') { // 如果按下回车键
        searchImages(); // 执行搜索
    }
}

// 解析 URL 参数
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        category: params.get('category')
    };
}

// 根据 URL 参数过滤文件列表
function filterImagesByURLParams() {
    const { name, category } = getURLParameters();
    let filteredImages = images;

    if (name) {
        filteredImages = filteredImages.filter(image => image.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (category) {
        filteredImages = filteredImages.filter(image => image.category === category);
    }

    displayImages(filteredImages);
}

// 初始化显示所有文件
filterImagesByURLParams();
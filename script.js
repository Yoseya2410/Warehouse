const images = [
    //js
    {id: 1, name: 'calculator.min.js', version: '', description: '一个具有计算器功能的js库', url: 'JS/calculator.min.js', category: 'js' },
    {id: 2, name: 'deployggb.js', version: '', description: '在网页中嵌入 GeoGebra 图形', url: 'JS/deployggb.js', category: 'js' },
    {id: 3, name: 'echarts.min.js', version: '', description: 'ECharts 图表库的压缩版本', url: 'JS/echarts.min.js', category: 'js' },
    {id: 4, name: 'function-plot.js', version: '', description: '一个基于 D3.js 构建的用于绘制数学函数图像的 JavaScript 库', url: 'JS/function-plot.js', category: 'js' },
    {id: 5, name: 'numeric.min.js', version: '', description: '一个用于在 JavaScript 中进行数值计算的库', url: 'JS/numeric.min.js', category: 'js' },
    //apk
    {id: 6, name: 'Aidea', version: '2.1.2', description: 'Yoseya 制作的第一款软件', url: 'apk/Aidea_2.1.2.apk', category: 'apk' },
    {id: 7, name: 'Aidea code', version: '1.0.4', description: 'Yoseya 的另一款作品，基于Aidea2.0 的精简版，专注脚本编写', url: 'apk/Aidea code_1.0.4.apk', category: 'apk' },
    //{ name: '', version: '', description: '暂无', url: '', category: '' },

    
    // 更多镜像...
];
// 按名称排序镜像数组
images.sort((a, b) => a.name.localeCompare(b.name));
// 显示镜像列表的函数
function displayImages(images) {
    const imageList = document.getElementById('imageList'); // 获取显示镜像列表的元素
    imageList.innerHTML = ''; // 清空当前列表
    images.forEach(image => { // 遍历镜像数组
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

        // 添加移动端长按事件监听器
        let touchTimeout;
        li.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchTimeout = setTimeout(() => {
                tooltip.style.display = 'block';
                tooltip.style.left = `${e.touches[0].pageX + 10}px`;
                tooltip.style.top = `${e.touches[0].pageY + 10}px`;
            }, 1000); // 长按1秒后显示描述
        });

        li.addEventListener('touchend', () => {
            clearTimeout(touchTimeout);
            tooltip.style.display = 'none';
        });

        li.addEventListener('click', () => { // 添加点击事件监听器
            window.location.href = image.url; // 点击后跳转到镜像的URL
        });
        imageList.appendChild(li); // 将新的列表项添加到列表中
    });
}

function searchImages() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredImages = images.filter(image => 
        image.name.toLowerCase().includes(query) || 
        image.version.includes(query) || 
        image.description.toLowerCase().includes(query)
    );
    filterByCategory(filteredImages);
}

function filterByCategory(images = null) {
    const selectedCategory = document.getElementById('categorySelect').value;
    let filteredImages = images || images.slice(); // 如果没有传入images，则使用全局的images数组
    if (selectedCategory) {
        filteredImages = filteredImages.filter(image => image.category === selectedCategory);
    }
    displayImages(filteredImages);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchImages();
    }
}

// 初始化显示所有镜像
displayImages(images);
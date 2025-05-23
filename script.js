// 定义一个包含文件信息的数组
let images = [];

// 从 data.json 文件加载数据
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        images = data;
        // 按名称排序文件数组
        images.sort((a, b) => a.name.localeCompare(b.name));

        // 初始化显示所有文件
        filterImagesByURLParams();
    })
    .catch(error => console.error('Error fetching data:', error));

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
        let timeoutId;
        li.addEventListener('mouseover', (e) => {
            // 清除之前的定时器
            clearTimeout(timeoutId);

            // 设置新的定时器
            timeoutId = setTimeout(() => {
                // 获取当前li元素的位置
                const rect = li.getBoundingClientRect();
                const top = rect.top + window.scrollY + li.offsetHeight + 10; // 在li下方显示
                const left = rect.left + window.scrollX;

                // 设置tooltip的位置
                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;

                // 显示tooltip
                tooltip.style.display = 'block';
            }, 500); // 悬停时间为500毫秒
        });

        // 添加鼠标移出事件监听器
        li.addEventListener('mouseout', () => {
            // 清除定时器并隐藏tooltip
            clearTimeout(timeoutId);
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

// 自动填充分类选项
function populateCategories() {
    const categorySelect = document.getElementById('categorySelect');

    // 从 data.json 获取数据
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 提取所有唯一的 category
            const categories = [...new Set(data.map(item => item.category))];

            // 清空当前选项（除了“所有文件”）
            categorySelect.innerHTML = '<option value="">所有文件</option>';

            // 添加新选项
            categories.forEach(category => {
                if (category) {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category;
                    categorySelect.appendChild(option);
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}



// 页面加载时调用
window.onload = function () {
    filterImagesByURLParams();
    populateCategories(); // 调用分类填充函数
};

// 初始化显示所有文件
filterImagesByURLParams();
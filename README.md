# Warehouse Admin 说明书

## 页内搜索
1. 若要查找某种类型的所有文件，在分类下拉菜单中选择所需文件类型，点击搜索按钮。
2. 若要根据文件名称搜索时，可以在搜索框填入文件名或有关字符进一步进行筛选
3. 若要通过搜索文件名直接搜索文件相关文件时，在搜索框直接输入文件名或相关字符，搜索与该名称或字符相匹配的所有文件


## URL搜索

1. **按名称搜索**：
   - 只显示名称中包含 "calculator" 的文件：
     ```
     http://yourdomain.com/yourpage.html?name=calculator
     ```

2. **按类别搜索**：
   - 只显示类别为 "js" 的文件：
     ```
     http://yourdomain.com/yourpage.html?category=js
     ```

3. **按名称和类别搜索**：
   - 只显示名称中包含 "plot" 且类别为 "js" 的文件：
     ```
     http://yourdomain.com/yourpage.html?name=plot&category=js
     ```

4. **不带参数**：
   - 显示所有文件：
     ```
     http://yourdomain.com/yourpage.html
     ```

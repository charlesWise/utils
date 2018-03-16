React.Children.map: 一种类似遍历map
<ol>
	{
	React.Children.map(this.props.children, function (child) {
	        return <li>{child}</li>;
	    })
	}
</ol>
React.Children.forEach:类似于 React.Children.map()，但是不返回对象。
React.Children.count:返回 children 当中的组件总数，和传递给 map 或者 forEach 的回调函数的调用次数一致。
React.Children.only:返回 children 中 仅有的子级。否则抛出异常。only方法接受的参数只能是一个对象，不能是多个对象（数组）。
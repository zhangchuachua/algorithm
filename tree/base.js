"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var tree = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 3,
            left: {
                val: 4,
                right: {
                    val: 5
                }
            }
        },
        right: {
            val: 6,
            left: {
                val: 7,
                right: {
                    val: 8
                }
            },
            right: {
                val: 9
            }
        }
    },
    right: {
        val: 10,
        left: {
            val: 11
        },
        right: {
            val: 12,
            left: {
                val: 13,
                left: {
                    val: 14
                }
            },
            right: {
                val: 15
            }
        }
    }
};
// !先序遍历，递归代码
// function preorder(root: Tree|undefined) {
//   if(!root) return;
//   console.log(root.val);
//   preorder(root.left);
//   preorder(root.right);
// }
// !先序遍历，非递归代码
// function preorderStack(root: Tree) {
//   if (!root) return;
//   const stack = [root]; // 使用一个栈，把节点压入栈中。
//   while (stack.length) { // 使用循环
//     const n = stack.pop();
//     console.log(n.val);
//     if (n.right) stack.push(n.right);// !但是注意这里一个点，需要先将right入栈，再是left，因为后进先出，递归中先遍历left，就是为了先出。所以这里就要后入left
//     if (n.left) stack.push(n.left); // *这里如果有两个子树的话，那么就会压入两个，但是每次出栈只会出一个，所以就会将右子树放到最后才输出。
//   }
// }
//
// preorderStack(tree);
// !中序遍历递归代码
// function inorder(root: Tree|undefined) {
//   if(!root) return;
//   inorder(root.left);
//   console.log(root.val);
//   inorder(root.right);
// }
//
// inorder(tree);
// !中序遍历非递归代码  中序遍历就与上面不一样了。有了一些变化，但是整体还是可以依照递归的方式来处理，比如递归里面先中序遍历左子树，那我们就可以直接先把root所有的左子树压入，然后再访问根节点。因为这里根节点是不断变化的，所以不能使用root作为根节点了，必须要使用一个变量进行存储。然后在指向右子树，不断循环就可以了，如下所示。
// function inorderStack(root: Tree) {
//   if (!root) return;
//   const stack = [];
//   let p: Tree | undefined = root; // !使用一个变量来存储当前的根节点，为什么不是root.left呢，因为后续再也不能前访问父亲节点了。而且这里的root就像本身是一个左子树，然后拿掉了整个父节点一样。
//   while (stack.length || p) { // !外部循环 注意这里的结束循环的条件哦 stack.length 不为空 与 p存在 缺一不可。第一次时stack为空，当 root 根节点被出栈的时候stack为空。所以需要stack.length的判断。  当子树没有左右子树时p为undefined，所以需要p的判断。
//     while (p) { // !每次循环都先把所有的左子树压入。 如果p不存在那么说明这边的左子树压完了
//       stack.push(p);
//       p = p.left;
//     }
//     const node = stack.pop() as Tree;
//     console.log(node.val); // 第二步访问根节点
//     p = node.right; // 第三步直接让p指向右子树，然后在下一次循环中会对右子树进行中序遍历
//   }
// }
// inorderStack(tree);
// !后序遍历 递归代码
// function postorder(root: Tree|undefined) {
//   if(!root) return;
//   postorder(root.left);
//   postorder(root.right);
//   console.log(root.val);
// }
// postorder(tree);
// !后序遍历 非递归代码
// !这里的代码又有所改变 要想解决这里的问题就必须理解 先序遍历的原理 这里的方式其实与先序遍历差不多，我开始就像使用中序遍历的思考方法。首先遍历到左子树和右子树，到达最末尾的节点，然后进行输出。但是只能正确输出这一个，我想往前输出时，却发现不知道应该向前输出几步，因为不知道父节点的情况，不知道那些是遍历过的，那些没有遍历。 中序遍历可以这样做，是因为第二步就是访问父节点，可以根据父节点的情况进行判断。
// *其实这里的情况与先序遍历很像，先序遍历把访问根节点放在第一步，后序遍历放在了最后一步。 这个时候画个图其实会好一点。（我这里就是画着图，感觉可以倒着输出） 可以等于倒着看 先序遍历。 先序遍历是先 访问根节点 - 左子树 - 右子树， 我们这里就等于是 访问根节点 - 右子树 - 左子树 但是注意这里的输出方式也是倒着的，所以需要倒着输出。
function postorderStack(root) {
    var e_1, _a;
    if (!root)
        return;
    var stack = [root];
    var reverse = []; // 使用一个数组来存储顺序
    while (stack.length) {
        var node = stack.pop();
        reverse.push(node.val);
        if (node.left)
            stack.push(node.left); // 先入后出。
        if (node.right)
            stack.push(node.right); // *后序遍历先遍历右子树，那么就是先输出右子树，那么就后入，然后先出
    }
    reverse = reverse.reverse(); // *数组颠倒
    try {
        for (var reverse_1 = __values(reverse), reverse_1_1 = reverse_1.next(); !reverse_1_1.done; reverse_1_1 = reverse_1.next()) {
            var i = reverse_1_1.value;
            console.log(i);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (reverse_1_1 && !reverse_1_1.done && (_a = reverse_1.return)) _a.call(reverse_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
postorderStack(tree);
// *总结一下，三个遍历方式，难的是非递归的代码。都需要通过借鉴递归调用的栈的数据结构来进行输出。  先序遍历和后序遍历要注意， 千万不能一股脑的遍历到末尾，因为不好向前，就跟链表不好向前一个道理。  中序遍历则不一样，它可以在中间访问父节点。

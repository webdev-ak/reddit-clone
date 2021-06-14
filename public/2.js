(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comments-tree.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _comment_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-node */ "./resources/js/components/postThread/comment-node.vue");
/* harmony import */ var _comment_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comment-manager */ "./resources/js/components/postThread/comment-manager.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    postId: {
      type: Number,
      required: true
    },
    initialCommentsCount: {
      type: Number,
      required: true
    }
  },
  components: {
    CommentNode: _comment_node__WEBPACK_IMPORTED_MODULE_1__["default"],
    CommentManager: _comment_manager__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      loading: null,
      threadId: null,
      commentsTree: [],
      commentsCount: this.initialCommentsCount,
      user: __auth(),
      currentCommentAction: {
        type: "comment",
        node: null,
        postId: this.postId
      },
      feedback: {
        status: '',
        message: ''
      }
    };
  },
  created: function created() {
    this.getCommentsTree();
  },
  computed: {
    isSingleThread: function isSingleThread() {
      return !!(this.$route.meta.singleThread && this.$route.params.threadId);
    }
  },
  watch: {
    $route: function $route(to, from) {
      this.getCommentsTree();
    },
    commentsCount: function commentsCount(newCount, oldCount) {
      this.$emit('update-comments-count', newCount);
    }
  },
  methods: {
    incrementCommentsCount: function incrementCommentsCount() {
      this.commentsCount++;
    },
    decrementCommentsCount: function decrementCommentsCount(deletedNode) {
      var _this = this;

      this.commentsCount--;

      var traverseNodes = function traverseNodes(node) {
        _this.commentsCount--;
        node.replies && node.replies.forEach(traverseNodes);
      };

      deletedNode.replies && deletedNode.replies.forEach(traverseNodes);
    },
    updateCommentOnOtherActiveTrees: function updateCommentOnOtherActiveTrees(updatedComment, action) {
      if (this.$route.name.match('userProfile')) {
        window.events.$emit('user-comment-updated', {
          updatedComment: updatedComment,
          action: action,
          postId: this.postId
        });
      }
    },
    nodeHasParent: function nodeHasParent(node) {
      return !!node.comment_id;
    },
    addNode: function addNode(node) {
      if (!this.nodeHasParent(node)) this.addToCommentsTree(node);else this.findReplyParent(node, this.pushNodeToCommentReplies);
      this.showCommentActionSuccessMessage('added');
      this.updateCommentOnOtherActiveTrees(node, 'added');
      this.incrementCommentsCount();
    },
    deleteNode: function deleteNode(node) {
      var nodeIsFirstElementOfTheTree = this.commentsTree[0].id === node.id;
      if (!this.nodeHasParent(node)) this.deleteFromCommentsTree(node);else this.findReplyParent(node, this.removeNodeFromCommentReplies);
      this.showCommentActionSuccessMessage('deleted');
      this.updateCommentOnOtherActiveTrees(node, 'deleted');
      this.decrementCommentsCount(node); // thread has been deleted so we have to go back to parent comments

      if (nodeIsFirstElementOfTheTree && this.isSingleThread) this.showParentComments(node);
    },
    replaceNode: function replaceNode(node) {
      if (!this.nodeHasParent(node)) this.replaceOnCommentsTree(node);else this.findReplyParent(node, this.replaceCommentReply);
      this.showCommentActionSuccessMessage('edited');
      this.updateCommentOnOtherActiveTrees(node, 'edited');
    },
    addToCommentsTree: function addToCommentsTree(comment) {
      this.commentsTree = [].concat(_toConsumableArray(this.commentsTree), [comment]);
    },
    deleteFromCommentsTree: function deleteFromCommentsTree(commentToDelete) {
      this.commentsTree = this.commentsTree.filter(function (comment) {
        return comment.id !== commentToDelete.id;
      });
    },
    replaceOnCommentsTree: function replaceOnCommentsTree(editedComment) {
      var editedCommentIndex = this.commentsTree.findIndex(function (comment) {
        return comment.id === editedComment.id;
      });
      this.commentsTree.splice(editedCommentIndex, 1, editedComment);
    },
    findReplyParent: function findReplyParent(reply, action) {
      var finder = function finder(comment) {
        if (comment.id === reply.comment_id) {
          action(comment, reply);
          return;
        }

        comment.replies && comment.replies.forEach(finder);
      };

      this.commentsTree.forEach(finder);
    },
    pushNodeToCommentReplies: function pushNodeToCommentReplies(comment, node) {
      comment.replies.push(node);
    },
    removeNodeFromCommentReplies: function removeNodeFromCommentReplies(comment, node) {
      var nodeIndex = comment.replies.findIndex(function (reply) {
        return reply.id === node.id;
      });
      comment.replies.splice(nodeIndex, 1);
    },
    replaceCommentReply: function replaceCommentReply(comment, newReply) {
      var replyIndex = comment.replies.findIndex(function (reply) {
        return reply.id === newReply.id;
      });
      comment.replies.splice(replyIndex, 1, newReply);
    },
    showCommentActionSuccessMessage: function showCommentActionSuccessMessage(action) {
      __showSuccessMessage("comment successfully ".concat(action));
    },
    setThreadId: function setThreadId() {
      this.threadId = this.$route.params.threadId;
    },
    getCommentsTree: function getCommentsTree() {
      var _this2 = this;

      this.loading = true;
      this.commentsTree = [];

      if (this.isSingleThread) {
        this.setThreadId();
        this.fetchSingleThread().then(function () {
          return _this2.loading = false;
        });
        return;
      }

      this.fetchComments().then(function () {
        return _this2.loading = false;
      });
    },
    fetchComments: function fetchComments() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this3.clearFeedback();

                _context.next = 3;
                return axios.get("/posts/".concat(_this3.postId, "/comments")).then(function (_ref) {
                  var data = _ref.data;
                  _this3.commentsTree = data;
                })["catch"](function (_ref2) {
                  var response = _ref2.response;

                  if (response.status === 404) {
                    _this3.feedback.status = 'empty';
                    _this3.feedback.message = 'No Comments Yet <br> Be the first to share what you think';
                    return;
                  }

                  _this3.setSomethingWentWrongFeedback();
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    fetchSingleThread: function fetchSingleThread() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this4.clearFeedback();

                _context2.next = 3;
                return axios.get("/comments/".concat(_this4.threadId)).then(function (_ref3) {
                  var data = _ref3.data;
                  _this4.commentsTree = [data];
                })["catch"](function (_ref4) {
                  var response = _ref4.response;

                  if (response.status === 404) {
                    _this4.feedback.status = 'empty';
                    _this4.feedback.message = 'Thread not found';
                    return;
                  }

                  _this4.setSomethingWentWrongFeedback();
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    setSomethingWentWrongFeedback: function setSomethingWentWrongFeedback() {
      this.feedback.status = 'error';
      this.feedback.message = "For some reason reddit couldn't be reached";
    },
    clearFeedback: function clearFeedback() {
      this.feedback = {
        status: '',
        message: ''
      };
    },
    showAllComments: function showAllComments() {
      this.$router.push({
        name: this.$route.meta.threadRouteName
      });
    },
    showParentComments: function showParentComments() {
      var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var node = comment ? comment : this.commentsTree[0];

      if (!node || !node.comment_id) {
        this.showAllComments();
        return;
      }

      var rouetParams = this.$route.params;
      rouetParams.threadId = Hashids.encode(node.comment_id);
      this.$router.push({
        name: this.$route.meta.singleThreadRouteName,
        rouetParams: rouetParams
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.leave-comment[data-v-7aba479d] {\n    margin: 20px 0 70px 48px;\n}\n.leave-comment h6[data-v-7aba479d] {\n    font-size: 16px;\n    font-weight: 500;\n    color:gray;\n}\n.leave-comment[data-v-7aba479d] .auth-buttons a {\n    padding: 6px 12px;\n}\n.no-results[data-v-7aba479d] {\n    height:200px;\n    font-size: 16px;\n    color:#606060;\n}\n.no-results .error[data-v-7aba479d] {\n    padding: 48px;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}\n.no-results img[data-v-7aba479d] {\n    height: 55px;\n    margin: 0 auto;\n    width: auto;\n}\ni[data-v-7aba479d] {\n    color: #A5A4A4;\n    font-size: 27px;\n}\n.show-comments[data-v-7aba479d] {\n    margin-top: 48px;\n    margin-left: 24px;\n    padding-left: 8px;\n}\n.show-comments > a[data-v-7aba479d] {\n    font-size: 13px;\n    font-weight: 700;\n    color: #5d561b;\n    font-weight:bold;\n    display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=template&id=7aba479d&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comments-tree.vue?vue&type=template&id=7aba479d&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "comments-section px-3 h-100" }, [
    !_vm.isSingleThread
      ? _c("div", { staticClass: "leave-comment" }, [
          _vm.user
            ? _c(
                "div",
                [
                  _vm._v("\n            Comment as "),
                  _c(
                    "router-link",
                    { attrs: { to: "/user/" + _vm.user.username } },
                    [_vm._v(_vm._s(_vm.user.username))]
                  ),
                  _vm._v(" "),
                  _c("comment-manager", {
                    attrs: { "comment-action": _vm.currentCommentAction },
                    on: { nodeAdded: _vm.addNode }
                  })
                ],
                1
              )
            : _c(
                "div",
                {
                  staticClass:
                    "d-flex border justify-content-between align-items-center p-3"
                },
                [_vm._m(0), _vm._v(" "), _c("div", [_c("auth-buttons")], 1)]
              )
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loading
      ? _c("div", [
          _vm.isSingleThread
            ? _c("div", { staticClass: "show-comments" }, [
                _c(
                  "a",
                  {
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.showAllComments($event)
                      }
                    }
                  },
                  [_vm._v("Show all comments")]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.showParentComments($event)
                      }
                    }
                  },
                  [_vm._v("Show parent comments")]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.commentsTree.length > 0
            ? _c(
                "div",
                { attrs: { id: "comments" } },
                _vm._l(_vm.commentsTree, function(comment) {
                  return _c("comment-node", {
                    key: comment.id,
                    staticClass: "my-4",
                    attrs: { comment: comment },
                    on: {
                      nodeAdded: _vm.addNode,
                      nodeEdited: _vm.replaceNode,
                      nodeDeleted: _vm.deleteNode
                    }
                  })
                }),
                1
              )
            : _c("div", { staticClass: "no-results" }, [
                _vm.feedback.status === "empty"
                  ? _c("div", { staticClass: "error" }, [
                      _c("i", { staticClass: "fas fa-comment-alt mb-3" }),
                      _vm._v(" "),
                      _vm.feedback.message
                        ? _c("div", {
                            domProps: {
                              innerHTML: _vm._s(_vm.feedback.message)
                            }
                          })
                        : _vm._e()
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.feedback.status === "error"
                  ? _c("div", { staticClass: "error" }, [
                      _c("img", {
                        attrs: {
                          src: _vm.$getConst("images").SNOO_THOUGHTFUL,
                          alt: ""
                        }
                      }),
                      _vm._v(" "),
                      _vm.feedback.message
                        ? _c("div", { staticClass: "my-3" }, [
                            _vm._v(_vm._s(_vm.feedback.message))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          on: { click: _vm.getCommentsTree }
                        },
                        [
                          _vm._v(
                            "\n                    retry\n                "
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
        ])
      : _c(
          "div",
          [
            _c("loading-simulation", {
              attrs: { type: "commentsTree", occurrences: 10 }
            })
          ],
          1
        )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("h6", [_vm._v("Log in or sign up to leave a comment")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/postThread/comments-tree.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/postThread/comments-tree.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comments_tree_vue_vue_type_template_id_7aba479d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments-tree.vue?vue&type=template&id=7aba479d&scoped=true& */ "./resources/js/components/postThread/comments-tree.vue?vue&type=template&id=7aba479d&scoped=true&");
/* harmony import */ var _comments_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments-tree.vue?vue&type=script&lang=js& */ "./resources/js/components/postThread/comments-tree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _comments_tree_vue_vue_type_style_index_0_id_7aba479d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css& */ "./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _comments_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _comments_tree_vue_vue_type_template_id_7aba479d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _comments_tree_vue_vue_type_template_id_7aba479d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7aba479d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/postThread/comments-tree.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/postThread/comments-tree.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/postThread/comments-tree.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./comments-tree.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_style_index_0_id_7aba479d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=style&index=0&id=7aba479d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_style_index_0_id_7aba479d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_style_index_0_id_7aba479d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_style_index_0_id_7aba479d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_style_index_0_id_7aba479d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_style_index_0_id_7aba479d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/postThread/comments-tree.vue?vue&type=template&id=7aba479d&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/postThread/comments-tree.vue?vue&type=template&id=7aba479d&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_template_id_7aba479d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./comments-tree.vue?vue&type=template&id=7aba479d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comments-tree.vue?vue&type=template&id=7aba479d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_template_id_7aba479d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comments_tree_vue_vue_type_template_id_7aba479d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comment-manager.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
var ACTIONS = [{
  type: 'comment',
  method: 'addNewNode'
}, {
  type: 'reply',
  method: 'addNewNode'
}, {
  type: 'edit',
  method: 'editNode'
}];
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    commentAction: {
      type: Object,
      required: true
    }
  },
  mounted: function mounted() {
    this.manageAction();
  },
  watch: {
    'commentAction.type': function commentActionType(newType, oldType) {
      this.manageAction();
    }
  },
  data: function data() {
    return {
      content: '',
      editorId: __uuid(),
      commenting: true,
      focus: false
    };
  },
  computed: {
    commentActionIsValid: function commentActionIsValid() {
      if (this.$isEditorContentEmpty(this.content) || !this.commenting) return false;
      return this.commentAction.type === 'edit' ? this.content !== this.commentAction.node.content : true;
    },
    showEditor: function showEditor() {
      return this.commentAction && this.commentAction.type !== 'delete';
    }
  },
  methods: {
    getEditor: function getEditor() {
      return $("#".concat(this.editorId, " .ql-editor"));
    },
    setContent: function setContent() {
      this.content = this.commentAction.type === 'edit' ? this.commentAction.node.content : '';
    },
    commentManager: function commentManager(e) {
      var _this = this;

      this.deactivateCommenting();
      this.content = this.$removeUnusedTextFromEditorContent(this.getEditor());
      this.currentAction = ACTIONS.find(function (action) {
        return action.type === _this.commentAction.type;
      });
      this[this.currentAction.method]().then(function () {
        _this.reactivateCommenting();

        _this.blurEditor();

        _this.resetCommentManager();
      })["catch"](function () {
        _this.reactivateCommenting();

        __showSomethingWentWrongMessage();
      });
    },
    manageAction: function manageAction() {
      if (this.commentAction.type === 'delete') {
        this.deleteNode();
        return;
      }

      this.setContent();
    },
    addNewNode: function addNewNode() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Axios.post("/comments/".concat(_this2.commentAction.postId), {
                  body: _this2.content,
                  comment_id: _this2.commentAction.type === 'reply' ? _this2.commentAction.node.id : null
                }).then(function (_ref) {
                  var data = _ref.data;

                  _this2.$emit('nodeAdded', data);

                  _this2.getEditor().empty();
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    editNode: function editNode() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Axios.put("/comments/".concat(_this3.commentAction.node.id), {
                  body: _this3.content
                }).then(function (_ref2) {
                  var data = _ref2.data;

                  _this3.$emit('nodeEdited', data);
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    deleteNode: function deleteNode() {
      var _this4 = this;

      if (confirm("Are you sure you wanna delete this comment")) {
        axios["delete"]("/comments/".concat(this.commentAction.node.id)).then(function () {
          return _this4.$emit('nodeDeleted', _this4.commentAction.node);
        })["catch"](function () {
          return __showSomethingWentWrongMessage();
        });
      } else this.resetCommentManager();
    },
    resetCommentManager: function resetCommentManager() {
      this.$emit('resetCommentManager');
    },
    blurEditor: function blurEditor() {
      var editor = this.$refs.editor;
      if (editor) editor.quill.blur();
    },
    deactivateCommenting: function deactivateCommenting() {
      this.commenting = false;
    },
    reactivateCommenting: function reactivateCommenting() {
      this.commenting = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.quillWrapper[data-v-edb5baf6] {\n    border: 1px solid transparent;\n}\n.editorFocused[data-v-edb5baf6]{\n    border: 1px solid #000;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "form",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.showEditor,
          expression: "showEditor"
        }
      ],
      staticClass: "comment-manager mt-2"
    },
    [
      _c("vueEditor", {
        ref: "editor",
        class: { editorFocused: _vm.focus },
        attrs: {
          id: _vm.editorId,
          editorToolbar: _vm.$getConst("CUSTOM_EDITOR_TOOLBAR"),
          placeholder: "What are your thoughts ?"
        },
        on: {
          focus: function($event) {
            _vm.focus = true
          },
          blur: function($event) {
            _vm.focus = false
          }
        },
        model: {
          value: _vm.content,
          callback: function($$v) {
            _vm.content = $$v
          },
          expression: "content"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "d-flex mt-2" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-sm btn-primary ml-auto",
            attrs: { disabled: !_vm.commentActionIsValid },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.commentManager($event)
              }
            }
          },
          [
            _vm._v(
              "\n            " +
                _vm._s(
                  _vm._f("capitalizeFirstLetter")(_vm.commentAction.type)
                ) +
                "\n        "
            )
          ]
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/postThread/comment-manager.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/postThread/comment-manager.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comment_manager_vue_vue_type_template_id_edb5baf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true& */ "./resources/js/components/postThread/comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true&");
/* harmony import */ var _comment_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-manager.vue?vue&type=script&lang=js& */ "./resources/js/components/postThread/comment-manager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _comment_manager_vue_vue_type_style_index_0_id_edb5baf6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css& */ "./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _comment_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _comment_manager_vue_vue_type_template_id_edb5baf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _comment_manager_vue_vue_type_template_id_edb5baf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "edb5baf6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/postThread/comment-manager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/postThread/comment-manager.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/postThread/comment-manager.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./comment-manager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css&":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_style_index_0_id_edb5baf6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=style&index=0&id=edb5baf6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_style_index_0_id_edb5baf6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_style_index_0_id_edb5baf6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_style_index_0_id_edb5baf6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_style_index_0_id_edb5baf6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_style_index_0_id_edb5baf6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/postThread/comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/postThread/comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_template_id_edb5baf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/comment-manager.vue?vue&type=template&id=edb5baf6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_template_id_edb5baf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_comment_manager_vue_vue_type_template_id_edb5baf6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
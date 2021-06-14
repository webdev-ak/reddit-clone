(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/post-thread.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comments_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments-tree */ "./resources/js/components/postThread/comments-tree.vue");
/* harmony import */ var _about_community__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../about-community */ "./resources/js/components/about-community.vue");
/* harmony import */ var _post_card_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../post-card.vue */ "./resources/js/components/post-card.vue");
/* harmony import */ var _communityPage_community_page_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../communityPage/community-page-header */ "./resources/js/components/communityPage/community-page-header.vue");
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
  components: {
    CommentsTree: _comments_tree__WEBPACK_IMPORTED_MODULE_0__["default"],
    AboutCommunity: _about_community__WEBPACK_IMPORTED_MODULE_1__["default"],
    PostCard: _post_card_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    CommunityPageHeader: _communityPage_community_page_header__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    initialPost: {
      type: Object,
      required: false
    },
    modal: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      post: null
    };
  },
  created: function created() {
    this.getThePost();
  },
  computed: {
    subreddit: function subreddit() {
      return this.post ? this.post.subreddit : {};
    }
  },
  watch: {
    $route: function $route(to, from) {
      if (to.params.postId !== from.params.postId) this.getThePost();
    }
  },
  methods: {
    getThePost: function getThePost() {
      var _this = this;

      this.post = this.initialPost;
      if (this.post) return;
      var postId = this.$route.params.postId,
          subredditName = this.$route.params.subreddit;
      Axios.get("/r/".concat(subredditName, "/posts/").concat(postId)).then(function (_ref) {
        var data = _ref.data;
        _this.post = data;

        _this.sendCurrentCommunityToPageObserver();

        _this.setCurrentCommentAction();
      })["catch"](function (_ref2) {
        var response = _ref2.response;
        var responseData = response.data;

        if (response.status === 404) {
          if (responseData.entity === 'subreddit') {
            _this.$showPageError('subreddit-not-found', responseData.message);

            return;
          }

          _this.$showPageError('post-not-found', responseData.message);
        }

        if (response.status === 403) {
          _this.$showPageError('private-subreddit-error', responseData.message);
        }
      });
    },
    setCurrentCommentAction: function setCurrentCommentAction() {
      this.currentCommentAction = {
        type: 'comment',
        params: {
          postId: this.post.id
        }
      };
    },
    sendCurrentCommunityToPageObserver: function sendCurrentCommunityToPageObserver() {
      __sendEntityToPageObserver(this.subreddit);
    },
    updatePostCommentsCount: function updatePostCommentsCount(count) {
      this.post.commentsCount = count;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.thread-max-width[data-v-20df371d] {\n    max-width: calc(100% - 160px);\n}\n.community-page-header[data-v-20df371d] .row {\n    display: flex;\n    flex-wrap: wrap;\n    margin-right: 0;\n    margin-left: 0;\n}\n.thread[data-v-20df371d] {\n    padding-bottom: 32px;\n    margin-bottom: 20px;\n    background-color: #fff;\n    border-radius: 0.30rem;\n    border: 1px solid #fff;\n}\n.thread[data-v-20df371d] .post .vote {\n    background-color: #fff;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=template&id=20df371d&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/post-thread.vue?vue&type=template&id=20df371d&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _vm.post
    ? _c(
        "div",
        [
          !_vm.modal
            ? _c("community-page-header", {
                attrs: { subreddit: _vm.subreddit }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "container-fluid mt-4",
              class: { "thread-max-width": !_vm.modal }
            },
            [
              _c("div", { staticClass: "row p-4 mx-0 mh-100" }, [
                _c("div", { staticClass: "col-md-8 pr-0" }, [
                  _c(
                    "div",
                    { staticClass: "thread" },
                    [
                      _c("post-card", {
                        staticClass: "mt-1",
                        attrs: { post: _vm.post }
                      }),
                      _vm._v(" "),
                      _c("comments-tree", {
                        attrs: {
                          "post-id": _vm.post.id,
                          "initial-comments-count": _vm.post.commentsCount
                        },
                        on: {
                          "update-comments-count": _vm.updatePostCommentsCount
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-md-4" },
                  [
                    _c("about-community", {
                      attrs: { subreddit: _vm.subreddit }
                    })
                  ],
                  1
                )
              ])
            ]
          )
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/postThread/post-thread.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/postThread/post-thread.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post_thread_vue_vue_type_template_id_20df371d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post-thread.vue?vue&type=template&id=20df371d&scoped=true& */ "./resources/js/components/postThread/post-thread.vue?vue&type=template&id=20df371d&scoped=true&");
/* harmony import */ var _post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post-thread.vue?vue&type=script&lang=js& */ "./resources/js/components/postThread/post-thread.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _post_thread_vue_vue_type_style_index_0_id_20df371d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css& */ "./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _post_thread_vue_vue_type_template_id_20df371d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _post_thread_vue_vue_type_template_id_20df371d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "20df371d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/postThread/post-thread.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/postThread/post-thread.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/postThread/post-thread.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./post-thread.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_style_index_0_id_20df371d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=style&index=0&id=20df371d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_style_index_0_id_20df371d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_style_index_0_id_20df371d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_style_index_0_id_20df371d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_style_index_0_id_20df371d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_style_index_0_id_20df371d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/postThread/post-thread.vue?vue&type=template&id=20df371d&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/postThread/post-thread.vue?vue&type=template&id=20df371d&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_template_id_20df371d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./post-thread.vue?vue&type=template&id=20df371d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/post-thread.vue?vue&type=template&id=20df371d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_template_id_20df371d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_post_thread_vue_vue_type_template_id_20df371d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
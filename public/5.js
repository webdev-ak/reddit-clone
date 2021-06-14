(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/the-post-thread.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comments_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments-tree */ "./resources/js/components/postThread/comments-tree.vue");
/* harmony import */ var _about_community__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../about-community */ "./resources/js/components/about-community.vue");
/* harmony import */ var _post_card_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../post-card.vue */ "./resources/js/components/post-card.vue");
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
    PostCard: _post_card_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      post: null,
      pageLoading: true
    };
  },
  mounted: function mounted() {
    this.getThePost();
  },
  computed: {
    subreddit: function subreddit() {
      return this.post.subreddit;
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

      this.pageLoading = true;
      var postId = this.$route.params.postId,
          subredditName = this.$route.params.subreddit;
      Axios.get("/r/".concat(subredditName, "/posts/").concat(postId)).then(function (_ref) {
        var data = _ref.data;
        _this.post = data;

        _this.sendCurrentCommunityToPageObserver();

        _this.pageLoading = false;
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

        ;

        if (response.status === 403) {
          _this.$showPageError('private-subreddit-error', responseData.message);
        }
      });
    },
    sendCurrentCommunityToPageObserver: function sendCurrentCommunityToPageObserver() {
      __sendEntityToPageObserver(this.subreddit);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.post-thread[data-v-860ba27e] {\n    min-height: 100%;\n}\n.post-thread[data-v-860ba27e] .postDescription {\n    margin-top:12px;\n}\n.body[data-v-860ba27e] {\n    background-color: red;\n}\n.thread[data-v-860ba27e] {\n    padding-bottom: 32px;\n    margin-bottom: 20px;\n    background-color: #fff;\n    border-radius: 0.30rem;\n    border: 1px solid #fff;\n}\n.thread[data-v-860ba27e] .post .vote {\n    background-color: #fff;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/postThread/the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true& ***!
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
  return !_vm.pageLoading
    ? _c("div", { staticClass: "post-thread container-fluid bg-dark" }, [
        _c(
          "div",
          {
            staticClass: "container-md p-4",
            staticStyle: { "background-color": "#cee3f8" }
          },
          [
            _c("div", { staticClass: "row mx-0" }, [
              _c("div", { staticClass: "col-md-8" }, [
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
                      ref: "commentsTree",
                      attrs: { "post-id": _vm.post.id }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-md-4", attrs: { id: "communityCard" } },
                [
                  _c("about-community", { attrs: { subreddit: _vm.subreddit } })
                ],
                1
              )
            ])
          ]
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/postThread/the-post-thread.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/postThread/the-post-thread.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _the_post_thread_vue_vue_type_template_id_860ba27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true& */ "./resources/js/components/postThread/the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true&");
/* harmony import */ var _the_post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./the-post-thread.vue?vue&type=script&lang=js& */ "./resources/js/components/postThread/the-post-thread.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _the_post_thread_vue_vue_type_style_index_0_id_860ba27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css& */ "./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _the_post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _the_post_thread_vue_vue_type_template_id_860ba27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _the_post_thread_vue_vue_type_template_id_860ba27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "860ba27e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/postThread/the-post-thread.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/postThread/the-post-thread.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/postThread/the-post-thread.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./the-post-thread.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css&":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_style_index_0_id_860ba27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=style&index=0&id=860ba27e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_style_index_0_id_860ba27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_style_index_0_id_860ba27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_style_index_0_id_860ba27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_style_index_0_id_860ba27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_style_index_0_id_860ba27e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/postThread/the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/postThread/the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_template_id_860ba27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/postThread/the-post-thread.vue?vue&type=template&id=860ba27e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_template_id_860ba27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_the_post_thread_vue_vue_type_template_id_860ba27e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
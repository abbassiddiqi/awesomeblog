'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var postSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  _creator: { type: Schema.ObjectId, ref: 'User' },
  _comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
});

var Post = _mongoose2.default.model('Post', postSchema);

exports.default = Post;
//# sourceMappingURL=Post.js.map
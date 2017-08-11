import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  _creator: { type: Schema.ObjectId, ref: 'User' },
  _post: { type: Schema.ObjectId, ref: 'Post' },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type:Boolean, default: false }
});

function autoPopulateCreator(next) {
  this.populate({
    path: '_creator',
    select: 'username -_id'
  });
  next();
}

commentSchema.pre('find', autoPopulateCreator);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

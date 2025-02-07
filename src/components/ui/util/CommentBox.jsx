import { FormInputText} from '@tesla/design-system-react';
import { Component } from "react";

class CommentBox extends Component {
    render() {
     const { commentValue, handleCommentValue, enterCommentLine} = this.props;
    return (
     <div>
      <FormInputText 
        style={{height:'100px', marginTop:'20px'}}
        onKeyDown={enterCommentLine} value={commentValue}
        id="comments-input" onChange={handleCommentValue}
        type="text" placeholder="Add a comment..." />
      </div>
     )}
    }


export default CommentBox;
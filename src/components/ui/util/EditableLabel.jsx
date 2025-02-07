import React from "react";
import { Component } from "react";
import {FormLabel, FormInputText,} from '@tesla/design-system-react';

// Creat an ElementMaker component
class EditableLabel extends Component {
  // Render a <span> element
  render() {
    return (
      <span>
        {
          // Use JavaScript's ternary operator to specify <span>'s inner content
          this.props.showInputEle ? (
            <FormInputText
              type="text"
              value={this.props.value}
              onKeyDown={this.props.handleKeyDown}
              autoFocus
            />
          ) : (
            <FormLabel
              onDoubleClick={this.props.handleDoubleClick}
              style={{
                display: "inline-block",
                height: "25px",
                minWidth: "300px",
              }}
            >
              {this.props.value}
            </FormLabel>
          )
        }
      </span>
    );
  }
}

export default EditableLabel;

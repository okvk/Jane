const React = require("react");
const PropTypes = require("prop-types");

const CodeMirror = window.CodeMirror;

const IS_MOBILE =
  typeof navigator === "undefined" ||
  (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i));

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isControlled: Boolean(this.props.value) };
    this.handleChange = this.handleChange.bind(this);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    const isTextArea = this.props.forceTextArea || IS_MOBILE;
    if (!isTextArea) {
      this.editor = CodeMirror.fromTextArea(this.editorRef.current, this.props);
      this.editor.on("change", this.handleChange);
      this.editor.on("dragover", (_instance, event) => {
        event.preventDefault();
      });
    }
  }

  componentDidUpdate() {
    if (!this.editor) {
      return;
    }
    if (this.props.value) {
      if (this.editor.getValue() !== this.props.value) {
        this.editor.setValue(this.props.value);
      }
    }
    if (this.props.theme) {
      if (this.editor.theme !== this.props.theme) {
        this.editor.setOption("theme", this.props.theme);
      }
    }
  }

  handleChange() {
    if (!this.editor) {
      return;
    }

    const value = this.editor.getValue();
    if (value === this.props.value) {
      return;
    }

    if (this.props.onChange) {
      this.props.onChange({ target: { value } });
    }

    if (this.editor.getValue() !== this.props.value) {
      if (this.state.isControlled) {
        this.editor.setValue(this.props.value);
      } else {
        this.props.value = value;
      }
    }
  }

  render() {
    const editor = React.createElement("textarea", {
      ref: this.editorRef,
      placeholder: "What's on your mind...",
      value: this.props.value,
      readOnly: this.props.readOnly,
      onChange: this.props.onChange,
      className: this.props.textAreaClassName
    });

    return React.createElement("div", { className: "editor-form" }, editor);
  }
}

CodeMirrorEditor.propTypes = {
  theme: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  textAreaClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  forceTextArea: PropTypes.bool,
  value: PropTypes.string
};

CodeMirrorEditor.defaultProps = {
  readOnly: true,
  textAreaClassName: "",
  forceTextArea: false,
  value: ""
};

export default CodeMirrorEditor;

import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "./TagSelector.scss";

const TagSelector = props => {
  const { selectedItems, placeholder, tags, onChange } = props;
  const filteredTags = tags.filter(tag => !selectedItems.includes(tag.name));
  return (
    <Select
      mode="multiple"
      placeholder={placeholder}
      value={selectedItems}
      onChange={onChange}
      style={{ width: "100%", border: "none" }}
    >
      {filteredTags.map(item => (
        <Select.Option key={item.name} value={item.name}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

TagSelector.propTypes = {
  placeholder: PropTypes.string,
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

TagSelector.defaultProps = {
  selectedItems: [],
  placeholder: "选择合适的标签"
};

export default TagSelector;

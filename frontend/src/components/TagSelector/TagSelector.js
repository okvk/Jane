import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const TagSelector = props => {
  const { selectedItems, placeholder, tags, onChange } = props;
  const filteredTags = tags.filter(
    tag => !selectedItems.map(item => item.key).includes(tag.id)
  );
  return (
    <Select
      mode="multiple"
      placeholder={placeholder}
      labelInValue
      onChange={selected => onChange(selected)}
      style={{ width: "100%" }}
    >
      {filteredTags.map(item => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

TagSelector.propTypes = {
  placeholder: PropTypes.string,
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

TagSelector.defaultProps = {
  placeholder: "select tags for your article"
};

export default TagSelector;

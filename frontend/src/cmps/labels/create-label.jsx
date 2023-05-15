import React from "react";
import { useState } from "react";
import { ColorPicker } from "./color-picker";
import { IoCloseOutline } from 'react-icons/io5'


export function CreateLabel({
  label,
  onToggleLabelEdit,
  onSaveLabel,
  onRemoveLabel,
}) {
  const [labelName, setLabelName] = useState(label?.title || "");
  const [selectedColor, setSelectedColor] = useState(label?.color);

  function handleChange({ target }) {
    if (target.type === "text") {
      setLabelName(target.value);
    }
  }

  function onSave(ev) {
    ev.preventDefault();
    if (!selectedColor) return;
    if (!label) label = {};
    label.class = selectedColor + '-opacity'
    label.title = labelName
    label.color = selectedColor
    onSaveLabel(label);
    onToggleLabelEdit(null);
  }

  function onRemove(ev) {
    ev.preventDefault();
    onToggleLabelEdit(null);
    onRemoveLabel(label._id);
  }

  const buttonDesc = label ? "Save" : "Create";

  return (
    <div className="create-label" style={{maxWidth: '300px'}}>
      <p className="sub-title">Title</p>
      <input
        className="label-title"
        onChange={handleChange}
        type="text"
        autoFocus
        onClick={(ev) => {
          ev.preventDefault();
        }}
        value={labelName}
      />
      <p className="sub-header">Select a color</p>
      <ColorPicker selectedColor={selectedColor}  setSelectedColor={setSelectedColor}/>
      <div className="btn-container">
        <button
          className="btn-remove-color"
          onClick={() => {
            setSelectedColor(null)
          }}
        >
          <IoCloseOutline className="icon-close" />
          Remove color
        </button>
      </div>
      <div className="save-remove">
        <button onClick={(ev) => { onSave(ev) }} className="btn-save">
          {buttonDesc}
        </button>
        {label && (
          <button onClick={(ev) => { onRemove(ev) }} className="btn-remove">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

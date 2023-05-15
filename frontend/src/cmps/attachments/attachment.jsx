import React, { useState } from "react";
import { utilService } from "../../services/util.service";
import { addImg } from "../../store/actions/task.actions";
import { uploadService } from "../../services/upload.service";
import { FastAverageColor } from 'fast-average-color'

export function Attachment({ task, groupId, board, setTaskDetailsModal }) {
  const [attachedLink, setAttachedLink] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const getAverageColor = new FastAverageColor()

  function onAttachLink() {
    const url = attachedLink;
    console.log('from attachment', url)
    if (!url) return;
    const isImageUrl = utilService.checkIfImg(url);
    console.log('from attachment', isImageUrl)
    if (isImageUrl) onAddImg(url);
  }

  async function onUploadImg(ev) {
    ev.preventDefault()
    try {
      setIsAdding(true);
      const url = await uploadService.uploadImg(ev);
      onAddImg(url.url);
    } catch (err) {
      console.log("Error on upload file to Cloudinary", err);
    }
  }

  async function onAddImg(imgUrl) {
    if (!task.cover) {

      const bgColor = await getAverageColor.getColorAsync(imgUrl)
      task.cover = {
        backgroundImage: `url('${imgUrl}')`,
        backgroundColor: bgColor.rgba
      }
      task.coverSize = 'half'
    }
    addImg(imgUrl, task, groupId, board);
    setTaskDetailsModal(null);
  }

  return (
    <section className="attachment">


      <label className="file-input">
        Computer
        <input type="file" accept="image/*" onChange={onUploadImg} />
      </label>

      <div className="seperator"></div>
      <div className="input-container">
        <label htmlFor="addLink">Attach a link</label>
        <input
          className="add-link"
          id="addLink"
          onChange={(ev) => setAttachedLink(ev.target.value)}
          type="text"
          placeholder="Paste any link here..."
          autoFocus
        />
      </div>
      <button onClick={onAttachLink}>Attach</button>


    </section>
  );
}

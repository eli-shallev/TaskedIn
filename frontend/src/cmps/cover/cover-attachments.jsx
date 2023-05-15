import { addImg, updateTask } from "../../store/actions/task.actions"
import { FastAverageColor } from 'fast-average-color'
import { uploadService } from "../../services/upload.service"


export function CoverAttachments({ board, task, groupId }) {
    const getAverageColor = new FastAverageColor()

    async function onSetCover(imgUrl) {
        const bgColor = await getAverageColor.getColorAsync(imgUrl)
        task.cover = {
            backgroundImage: `url('${imgUrl}')`,
            backgroundColor: bgColor.rgba
        }

        if (!task.coverSize) task.coverSize = 'half'
        updateTask(task, groupId, board)
    }

    async function onUploadImg(ev) {
        try {
            const url = await uploadService.uploadImg(ev);
            onAddImg(url.url);
        } catch (err) {
            console.log("Error on upload file to Cloudinary", err);
        }
    }

    async function onAddImg(imgUrl) {
        const bgColor = await getAverageColor.getColorAsync(imgUrl)
        task.cover = {
            backgroundImage: `url('${imgUrl}')`,
            backgroundColor: bgColor.rgba
        }
        task.coverSize = 'half'
        addImg(imgUrl, task, groupId, board);
    }

    return (
        <div className="cover-attachments">
            <span className="title">Attachments</span>
            {task.attachments && <div className="attach-container">
                {task.attachments.map(item => {
                    return (
                        <img className={`${((task?.cover?.backgroundImage) && (task?.cover?.backgroundImage.substring(5, task?.cover?.backgroundImage.length - 2) === item.url)) ? 'selected' : ''}`} onClick={() => onSetCover(item.url)} src={item.url} alt="" />
                    )
                })}
            </div>}
            <label className="btn-upload-attach">
                <input type="file" accept="image/*" onChange={onUploadImg} />
                Upload a cover image
            </label>
        </div>
    )
}
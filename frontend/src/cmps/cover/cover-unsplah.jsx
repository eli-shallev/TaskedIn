import { useEffect } from "react"
import { useState } from "react"
import { utilService } from "../../services/util.service"
import { updateTask } from "../../store/actions/task.actions"
import { FastAverageColor } from 'fast-average-color'

export function CoverUnsplah({ board, task, groupId }) {
    const [imgs, setImgs] = useState(null)
    const getAverageColor = new FastAverageColor()

    useEffect(() => {
        setImgs(utilService.getbgImgs())
        console.log('task', task)
    }, [])


    async function onSetStyle(imgUrl) {
        const bgColor = await getAverageColor.getColorAsync(imgUrl)
        task.cover = {
            backgroundImage: `url('${imgUrl}')`,
            backgroundColor: bgColor.rgba
        }

        if(!task.coverSize) task.coverSize = 'half'
        updateTask(task, groupId, board)
    }

    return (
        <div className="cover-unsplah">
            <span className="title">Photos from Usplash</span>

            {imgs && <div className="imgs-container">
                {imgs.slice(11, 17).map(img => {
                    return (
                        <div className={`img-item ${((task?.cover?.backgroundImage) && (task?.cover?.backgroundImage.substring(5, task?.cover?.backgroundImage.length - 2) === img.url)) ? 'selected' : ''} `} key={img.id} onClick={() => onSetStyle(img.url)}>
                            <img src={img.url} />
                            <div onClick={(event) => event.stopPropagation()}>
                                <a href={`https://unsplash.com/@${img.user}`} target="_blank">{img.user}</a>
                            </div>
                        </div>
                    )
                })}
            </div>}

            <p>By using images from Unsplash, you agree to their <a href={`https://unsplash.com/license`} target="_blank">license</a> and <a href={`https://unsplash.com/terms`} target="_blank">Terms of Service</a></p>
        </div>
    )
}
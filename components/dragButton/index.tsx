

import { DragButtonProps } from "@/types"
import Draggable from "react-draggable"

const DragButton: React.FC<DragButtonProps> = ({ onDrag }) => {
    return(
        <Draggable
            axis="x"
            defaultClassName="DragHandle"
            defaultClassNameDragging="DragHandleActive"
            defaultPosition={{x: 0, y: 0}}
            handle=".handle"
            grid={[25, 25]}
            scale={1}
            onDrag={onDrag}
        >
            <span className="DragHandleIcon handle">
            ⋮
            </span>
        </Draggable>
    )
}

export default DragButton
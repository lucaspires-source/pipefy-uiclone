import React,{useRef,useContext} from "react";
import { Container, Label } from "./styles";
import { useDrag, useDrop} from 'react-dnd'
import BoardContext from "../Board/context";


const Card = ({ data,index,listIndex }) => {
  const ref = useRef()
  const{move} = useContext(BoardContext)
  const [{isDragging}, dragRef] =   useDrag({
    item : {type: 'CARD',index,listIndex},
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),


})
const [,dropRef] = useDrop({
  accept:'CARD' ,
  hover(item,monitor){
    const draggedListIndex = item.list.index
    const draggedIndex = item.index
    const targetIndex = index

    if(draggedIndex === targetIndex){
      return
    }
    const targetSize = ref.current.getBoundingClientRect()
    const targetCenter = (targetSize.bottom - targetSize.top)/2
    const draggedOffset = monitor.getClientOffset()
    const draggedTop =  draggedOffset - targetSize.top


    
  if(draggedIndex < targetIndex && draggedTop < targetCenter){
    return
  }

  if(draggedIndex > targetIndex && draggedTop > targetCenter){
    return
  }
    move(draggedListIndex,draggedIndex,targetIndex)
  }

 })
 dragRef(dropRef(ref))
  return (
    <Container ref={dragRef} isDragging={isDragging}>
      <header>
        {data.labels.map((label) => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar" />}
    </Container>
  );
};

export default Card;

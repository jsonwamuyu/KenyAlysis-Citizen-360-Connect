import { useState } from "react";

export const Gallery = () => {
  const imageList = [
    { id: 1, imgUrl: "" },
    { id: 2, imgUrl: "" },
    { id: 3, imgUrl: "" },
  ];
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasIndex = index < imageList.length - 1;

  function hundleNextClick() {
    if(hasIndex){
        setIndex(index + 1)
    }else(
        setIndex(0)
    )
  }
  function hundleMoreClick(){
    setShowMore(!showMore)
  }
  let imag = imageList[index]
  return (
    <div>
      <div></div>
    </div>
  );
};

export const Modal = ({ handleCloseModal }) => {
  return (
    <div className="modal-background" onClick={handleCloseModal}>
      <div className="modal-container flex flex-col gap-[1rem]" onClick={(e)=>{e.stopPropagation()}}>
        <div className="flex justify-end">
        <button onClick={handleCloseModal} className="cursor-pointer bg-red-400 p-1 rounded-full h-8 text-white  w-8"> X </button>
        </div>
        
        <div className="modal-header">
          <h3 className="md-3">Create a Post</h3>
        </div>
        <div className="modal-body">
          <form action="" className="flex flex-col gap-[0.5rem]">
            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-400 p-2 outline-none rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                className="border-gray-400 outline-none border p-2 rounded-sm"
                placeholder="Enter the body"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer flex flex-col justify-between mt-[1rem]">
        
          {/* <button
            className="bg-red-500 py-[0.5rem] px-[0.875rem] text-white cursor-pointer rounded-sm"
            onClick={handleCloseModal}
          >
            Cancel
          </button> */}
          <button className="bg-theme py-[0.5rem] px-[0.875rem] text-white cursor-pointer rounded-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

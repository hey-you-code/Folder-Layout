import { useState } from 'react';

function Folder({ explorer, handleInsertNode }) {
  const [isExpand, setIsExpand] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setIsExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <div>
      {explorer.isFolder ? (
        <div className="">
          <div
            className="bg-blue-500 text-white w-[200px] flex justify-between cursor-pointer  px-2 space-x-2"
            onClick={() => setIsExpand(!isExpand)}
          >
            <span>📂{explorer.name}</span>
            <div className="space-x-1">
              <span
                onClick={(e) => handleNewFolder(e, true)}
                className="cursor-pointer"
              >
                📂
              </span>
              <span
                onClick={(e) => handleNewFolder(e, false)}
                className="cursor-pointer"
              >
                📄
              </span>
            </div>
          </div>
          <div className={isExpand ? 'block px-4 py-2 space-y-2' : 'hidden'}>
            {showInput.visible && (
              <div>
                <span>{showInput.isFolder ? '📂' : '📄'}</span>
                <input
                  className="outline-none text-black px-1"
                  autoFocus={true}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  type="text"
                  onKeyDown={onAddFolder}
                />
              </div>
            )}
            {explorer.items.map((exp) => (
              <Folder handleInsertNode={handleInsertNode} explorer={exp} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <span className="text-white">📄 {explorer.name}</span>
        </>
      )}
    </div>
  );
}

export default Folder;

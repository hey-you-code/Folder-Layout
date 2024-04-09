import { useState } from 'react';
import Folder from './component/Folder';
import { explorer } from './data/folderDetails';
import useTraverseTree from './hooks/useTraverseTree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  console.log(explorerData);

  return (
    <>
      <div className="bg-[#000] flex justify-center items-center w-screen text-white h-screen">
        <div>
          <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
        </div>
      </div>
    </>
  );
}

export default App;

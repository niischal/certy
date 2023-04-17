import React from "react";
import DocViewer from "@cyntler/react-doc-viewer";

const FileViewer = ({ uri }) => {
  const docs = [{ uri: uri }];
  return (
    <div>
      <hr />
      <DocViewer
        documents={docs}
        style={{ width: 500 }}
        config={{
          header: {
            disableHeader: true,
            disableFileName: true,
            retainURLParams: false,
          },
        }}
      />
    </div>
  );
};

export default FileViewer;

import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@mantine/core";


function Viewer({ name, value }) {
    const editorRef = useRef();
    const { CKEditor, BalloonEditor } = editorRef.current || {};
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            BalloonEditor: require("ckeditor5-custom-build/build/ckeditor"),

        };
        setEditorLoaded(true);
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor

                    type=""
                    name={name}
                    editor={BalloonEditor}
                    data={value}
                    disabled={true}

                />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Viewer;
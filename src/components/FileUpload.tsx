"use client";
import {
  type ChangeEventHandler,
  type ComponentProps,
  type DragEventHandler,
  type PropsWithChildren,
  useRef,
  useState,
} from "react";

interface IProps
  extends Omit<
    ComponentProps<"input">,
    "value" | "onChange" | "className" | "type"
  > {
  onChange: (file: File | null) => void;
  validateOnDrag: (file: DataTransferItem) => boolean;
  validateOnDrop: (file: File) => boolean;
}

export default function FileUpload({
  name,
  onChange,
  validateOnDrag,
  validateOnDrop,
  children,
  ...inputProps
}: PropsWithChildren<IProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  const handleDropFile: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!validateOnDrop(droppedFile)) {
      alert("Invalid file type");
      return;
    }
    if (inputRef.current) {
      inputRef.current.files = e.dataTransfer.files;
    }
    onChange(droppedFile);
    setIsDragOver(false);
  };

  const handleFileDragOver: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    const draggingFile = e.dataTransfer.items[0];
    if (validateOnDrag(draggingFile)) {
      setIsDragOver(true);
    }
  };
  const handleFileDragLeave: DragEventHandler<HTMLLabelElement> = () => {
    setIsDragOver(false);
  };

  return (
    <label
      htmlFor={name}
      onDrop={handleDropFile}
      onDragOver={handleFileDragOver}
      onDragLeave={handleFileDragLeave}
      data-is-dragover={isDragOver}
      className="group"
    >
      {children}
      <input
        ref={inputRef}
        type="file"
        id={name}
        name={name}
        onChange={handleFileChange}
        className="sr-only"
        {...inputProps}
      />
    </label>
  );
}

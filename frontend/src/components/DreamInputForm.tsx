import React from 'react';

const DreamInputForm: React.FC = () => {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <textarea
        className="form-textarea w-full resize-none rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary border border-secondary-light bg-secondary-dark min-h-48 placeholder:text-text-secondary p-4 text-base font-normal leading-relaxed"
        placeholder="Describe your dream here..."
        defaultValue={""} // Using defaultValue for uncontrolled component
      ></textarea>
      <div className="flex items-center justify-between">
        <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary hover:bg-primary-light text-white text-sm font-medium leading-normal tracking-wide transition-colors duration-200">
          <i className="material-icons text-xl">mic</i>
          <span className="truncate">Start Dictation</span>
        </button>
        <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-secondary hover:bg-secondary-light text-text-primary text-sm font-medium leading-normal tracking-wide transition-colors duration-200">
          <i className="material-icons text-xl">save</i>
          <span className="truncate">Save Dream</span>
        </button>
      </div>
    </div>
  );
};

export default DreamInputForm;

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-secondary px-6 sm:px-10 py-3">
      <div className="flex items-center gap-6 sm:gap-8">
        <div className="flex items-center gap-3 sm:gap-4 text-text-primary">
          <svg
            className="size-6 sm:size-7 text-primary"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
            <path
              clipRule="evenodd"
              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dream Weaver</h1>
        </div>
        <nav className="hidden sm:flex items-center gap-6 sm:gap-9">
          <a
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
            href="#"
          >
            Home
          </a>
          <a
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
            href="#"
          >
            Explore
          </a>
          <a className="text-text-primary text-sm font-medium" href="#">
            Journal
          </a>
          <a
            className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
            href="#"
          >
            Community
          </a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
        <label className="relative flex items-center min-w-32 sm:min-w-40 max-w-xs">
          <div className="absolute left-3 text-text-secondary">
            <i className="material-icons text-xl">search</i>
          </div>
          <input
            className="form-input w-full rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary border-none bg-secondary focus:border-none h-10 placeholder:text-text-secondary pl-10 pr-3 text-sm font-normal"
            placeholder="Search"
            defaultValue="" // Changed value to defaultValue for uncontrolled component
          />
        </label>
        <button className="icon-button text-text-secondary hover:text-text-primary">
          <i className="material-icons text-2xl">notifications</i>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDVtov3XjKj7172lxg_QWtpAnLugbOBYkNsvwzF2MX0hMbSqE-rA1TpSCoYFqTeEj6Wr1DdkCIRIylSGbvX1M2jG7_BgjdK3ps5qgKWBxvZX8v8f30sEiXYQ66gJrq35KKdS0LJjAmG3K9Qop7qM36TUVniWUOAsfpVAyak8EeaqycysJq9lFty5t2xWtwLw1yn4qLArgPnRpxwv4c6f1Kttj3PdqIsW9ZgKeAdpDYWr_hhPtNGr29NqiQq6b4hT-mwJrWcPCzCGt6")',
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;

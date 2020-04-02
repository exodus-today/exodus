import * as React from 'react';
import { ToastContainer, toast, PositionOptions } from 'react-toastify';


class Notifications extends React.Component {
    hideProgressBar: true;
    closeButton: false;
    closeOnClick: true;
    newestOnTop: true;
    pauseOnHover: true;
    draggable: true;
    position: "bottom-right";
    autoClose: 5000;

    render() {
        return (
            <ToastContainer 
                hideProgressBar={this.hideProgressBar} 
                position={this.position}
                autoClose={this.autoClose}
                closeButton={this.closeButton} 
                newestOnTop={this.newestOnTop}
                pauseOnHover={this.pauseOnHover}
                draggable={this.draggable}
                closeOnClick={this.closeOnClick}
            />
        );
    }
}

//const notify = toast;
const defaultOptions = {
    hideProgressBar: true,
    position: 'top-right' as PositionOptions,
    autoClose: 5000,
    closeButton: false, 
    newestOnTop: true,
    pauseOnHover: true,
    draggable: true,
    closeOnClick: true,
};

const notify = Object.assign(
    {
      success: (content: string) =>
        toast.success(content, defaultOptions),
      info: (content: string) =>
        toast.info(content, defaultOptions),
      warning: (content: string) =>
        toast.warn(content, defaultOptions),
      error: (content: string) =>
        toast.error(content, defaultOptions),
    }
  );

export {
    Notifications,
    notify,
  }
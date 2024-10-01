import FuseLoading from "@fuse/core/FuseLoading/FuseLoading";

const LoadingView = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <FuseLoading />
        </div>
    );
};

export default LoadingView;

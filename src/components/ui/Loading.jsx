import { motion } from "framer-motion";

const Loading = ({ type = "dashboard" }) => {
  const DashboardSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg shimmer"></div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded shimmer"></div>
                </div>
              </div>
              <div className="w-12 h-4 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="w-32 h-6 bg-gray-200 rounded shimmer mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded shimmer"></div>
                <div className="w-3/4 h-3 bg-gray-200 rounded shimmer"></div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TableSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded shimmer"></div>
          <div className="w-16 h-4 bg-gray-200 rounded shimmer"></div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full shimmer"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 rounded shimmer"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded shimmer"></div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-6 bg-gray-200 rounded shimmer"></div>
                <div className="w-20 h-6 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FormSkeleton = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="w-32 h-6 bg-gray-200 rounded shimmer mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="w-20 h-4 bg-gray-200 rounded shimmer"></div>
              <div className="w-full h-10 bg-gray-200 rounded shimmer"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="w-40 h-6 bg-gray-200 rounded shimmer mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-2 border-gray-200 rounded-lg p-4">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full shimmer mx-auto"></div>
                <div className="w-24 h-4 bg-gray-200 rounded shimmer mx-auto"></div>
                <div className="w-16 h-6 bg-gray-200 rounded shimmer mx-auto"></div>
                <div className="w-full h-10 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const skeletonTypes = {
    dashboard: DashboardSkeleton,
    table: TableSkeleton,
    form: FormSkeleton
  };

  const SkeletonComponent = skeletonTypes[type] || DashboardSkeleton;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="animate-pulse"
    >
      <SkeletonComponent />
    </motion.div>
  );
};

export default Loading;
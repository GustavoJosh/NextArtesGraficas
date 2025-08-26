export default function Loading() {
  return (
    <div className="bg-gray-950 min-h-screen text-white pt-16">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Loading skeleton for breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading skeleton for header */}
        <div className="text-left mb-12">
          <div className="w-64 h-12 bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="w-96 h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Loading skeleton for content */}
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <div className="w-48 h-8 bg-gray-700 rounded animate-pulse mx-auto mb-4"></div>
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse mx-auto mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg animate-pulse mb-4"></div>
                  <div className="w-24 h-6 bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="w-32 h-4 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
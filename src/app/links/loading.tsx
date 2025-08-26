export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded mx-auto mb-2 animate-pulse" style={{width: '60%'}}></div>
          <div className="h-4 bg-gray-200 rounded mx-auto animate-pulse" style={{width: '80%'}}></div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="h-6 bg-gray-300 rounded mb-3 animate-pulse" style={{width: '70%'}}></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
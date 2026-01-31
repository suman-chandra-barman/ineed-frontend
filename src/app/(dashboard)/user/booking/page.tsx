function BookingPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Booking
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>🏠</span>
          <span>&gt;</span>
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Booking</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600">Your bookings will appear here.</p>
      </div>
    </div>
  );
}

export default BookingPage;

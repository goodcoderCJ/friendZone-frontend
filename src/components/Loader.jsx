// Objective: Create a loader component.

const Loader = () => {
  return (
    <div className="flex justify-center items-center" data-testid="loader-container">
    <div className="loader" data-testid="loader"></div>

    </div>
  )
}

export default Loader
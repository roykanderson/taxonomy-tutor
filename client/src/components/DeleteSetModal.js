import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import OutsideAlerter from "./OutsideAlerter"

import { useDeleteSet } from "../hooks"

const DeleteSetModal = ({ setShowModal, set }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const navigateAfterDeletion = () => {
    navigate('/profile')
  }

  const deleteSet = useDeleteSet(navigateAfterDeletion)

  const handleDelete = () => {
    deleteSet.mutate(set.id)
    queryClient.invalidateQueries('sets')
  }

  return (
    <div className="species-add-modal-overlay">
      <OutsideAlerter sideEffectFn={() => setShowModal(false)}>
        <div className='delete-set-modal-container'>
          <div className="delete-set-modal-header">
            Are you sure you want to delete "{set.name}"?
          </div>
          <div className="delete-set-modal-buttons">
            <button className="delete-set-modal-button" onClick={handleDelete}>
              Yes
            </button>
            <button className="delete-set-modal-button" onClick={() => setShowModal(false)}>
              No
            </button>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default DeleteSetModal
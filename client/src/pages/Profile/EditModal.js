import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import OutsideDetector from "../../components/OutsideDetector"

import useDeleteSet from '../../hooks/useDeleteSet'

import styles from './EditModal.module.css'

const EditModal = ({ setShowModal, set }) => {
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
    <div className={styles.EditModal}>
      <OutsideDetector sideEffectFn={() => setShowModal(false)}>
        <div className={styles.EditModal__container}>
          <div className={styles.EditModal__header}>
            Are you sure you want to delete "{set.name}"?
          </div>
          <div className={styles.EditModal__buttons}>
            <button className={styles.EditModal__button} onClick={handleDelete}>
              Yes
            </button>
            <button className={styles.EditModal__button} onClick={() => setShowModal(false)}>
              No
            </button>
          </div>
        </div>
      </OutsideDetector>
    </div>
  )
}

export default EditModal
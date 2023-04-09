import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import useCreateSet from '../../hooks/useCreateSet'

import CreateAdd from "./CreateAdd"
import CreateTaxon from "./CreateTaxon"
import CreateTitle from "./CreateTitle"

import styles from './ProfileCreate.module.css'

const ProfileCreate = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [taxa, setTaxa] = useState([])

  const createSet = useCreateSet(navigate)

  const handleCreate = () => {
    createSet.mutate({ title, taxonIds: taxa.map(taxa => taxa.id) })
    queryClient.invalidateQueries('sets')
  }

  return (
    <div className={styles.ProfileCreate}>
      <CreateTitle title={title} setTitle={setTitle} />
      {taxa.map((taxon, index) =>
        <CreateTaxon key={taxon.id} taxa={taxa} setTaxa={setTaxa} index={index} />
      )}
      <CreateAdd
        taxa={taxa}
        setTaxa={setTaxa}
      />
      <button className={title ? `${styles.ProfileCreate__submit}` : `${styles.ProfileCreate__submit} ${styles['ProfileCreate__submit--inactive']}`} onClick={handleCreate} disabled={!title}>
        Create
      </button>
    </div>
  )
}

export default ProfileCreate
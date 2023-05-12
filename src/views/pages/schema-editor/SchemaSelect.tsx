import useJwt from '@/auth/jwt/useJwt'
import { useEffect, useState } from 'react'
import Select from 'react-select'

export type selectRoomValue = {
  label: string;
  value: string;
}

export const defaultSelectOption = { value: 'newSchema', label: 'Новая Схема' }

const SchemaSelect = (props: any) => {
  const { className, setCanvasItems, setRoomSize, defaultSelectOption, selectedRoom, setSelectedRoom } = props
  
  const [roomSchemaOptions, setRoomSchemaOptions] = useState<selectRoomValue[]>([defaultSelectOption])

  const { projectInstance } = useJwt()

  useEffect(() => {
    projectInstance.get('/api/v1/schemas/room-schemas/')
      .then((response: any) => {
        const roomSchemaFetchedOptions = response.data.map((roomSchema: any) => {
          return { label: roomSchema.name, value: roomSchema.id }
        })

        setRoomSchemaOptions([{ value: 'newSchema', label: 'Новая Схема' }, ...roomSchemaFetchedOptions])
      })
  }, [])

  useEffect(() => {
    if (!selectedRoom) return

    if (selectedRoom.value === 'newSchema') {
      setCanvasItems([])
      setRoomSize({width: '', length: ''})
      return
    }
    
    projectInstance.get(`/api/v1/schemas/room-schemas/${selectedRoom.value}`)
      .then((response: any) => {
        const data = response.data
        const items = data.items.map((item: any, index: number) => {
          item.key = index + 1
          return item
        })
        setCanvasItems(items)
        setRoomSize({width: data.width, length: data.length})
      })
  }, [selectedRoom])

  return (
    <Select
      className={`react-select ${className}`}
      classNamePrefix='select'
      value={selectedRoom}
      onChange={(e: any) => setSelectedRoom(e)}
      defaultValue={defaultSelectOption}
      options={roomSchemaOptions}
      placeholder={'Кабинет №...'}
      noOptionsMessage={() => 'Пусто'}
    />
  )
}

export default SchemaSelect

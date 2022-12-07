import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddSemester from './../components/AddSemester';

export default function Home() {
  return (
    <div>
      <AddSemester />
    </div>
  )
}

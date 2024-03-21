
import React, {useState, useEffect} from "react";
import axios from "axios";
import CardComponent from "./card";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInterfaceProps {
  backendName: string; //go
}

function UserInterface({ backendName }: UserInterfaceProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });
    

    const backgroundColors: { [key: string]: string } = {
    go: 'bg-cyan-500',
  };

  const buttonColors: { [key: string]: string } = {
    go: 'bg-cyan-700 hover:bg-blue-600',
  };

  const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
  const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/${backendName}/users`)
        //latest users i add will be on TOP
        setUsers(response.data.reverse())
      } catch (error) {
        console.error('Error fetching data: ', error)
        }
    }

    fetchData()
    //if emppty changes will be restFul only one time and not as need based on user ineraction 
    },[backendName, apiUrl])
}

export default UserInterface
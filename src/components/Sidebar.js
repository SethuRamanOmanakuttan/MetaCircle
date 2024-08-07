// src/components/Sidebar.js

import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../contexts/Web3Context";
import Group from "./Group";

function Sidebar() {
  const { contract, account } = useContext(Web3Context);
  const [allGroups, setAllGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (contract && account) {
        try {
          const groupCount = await contract.groupCount();
          const all = [];
          const joined = [];
          for (let i = 1; i <= groupCount; i++) {
            const group = await contract.groups(i);
            const isMember = await contract.isMember(i, account);
            const groupWithId = { ...group, groupId: i };
            all.push(groupWithId);
            if (isMember) {
              joined.push(groupWithId);
            }
          }
          setAllGroups(all);
          setJoinedGroups(joined);
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      }
    };
    fetchGroups();
  }, [contract, account]);

  return (
    <div className='w-1/4 bg-gray-800 p-4 rounded shadow border border-gray-700'>
      <h2 className='text-xl font-bold mb-4 text-blue-400'>Groups</h2>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2 text-gray-300'>All Groups</h3>
        {allGroups.map((group) => (
          <Group
            key={group.groupId.toString()}
            group={group}
            showJoinButton={true}
          />
        ))}
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-2 text-gray-300'>
          Your Joined Groups
        </h3>
        {joinedGroups.length > 0 ? (
          joinedGroups.map((group) => (
            <Group
              key={group.groupId.toString()}
              group={group}
              showJoinButton={false}
            />
          ))
        ) : (
          <p className='text-gray-400'>You haven't joined any groups yet.</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;

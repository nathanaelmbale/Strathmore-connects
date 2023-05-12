import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommunityContext } from "../hooks/useCommunityContext";

const EditCommunity = () => {
    const { user } = useAuthContext()
    const { communities, dispatchCommunity } = useCommunityContext()
    const [results, setResults] = useState("")

    let newName
    let newCommunity
    let communityName
    let communityDescription

    useEffect(() => {

        const fetchCommunity = async () => {
            const response = await fetch('http://localhost:5000/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })

            const json = await response.json()

            if (response.ok) {
                dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json })
            }
        }


        if (user) {
            fetchCommunity()
        }
    }, [dispatchCommunity, user])

    const handle = (e) => {
        newName = e.target.textContent;
        communityName = true
        console.log("edit value", newName, communityName)

        //dispatchCommunity({ type: "UPDATE_COMMUNITY", payload: updatedCommunity });
    };

    const handleDescriptionChange = (e) => {
        newCommunity = e.target.textContent;
        communityDescription = true
        console.log("edit value", newCommunity, communityDescription)

        //ispatchCommunity({ type: "UPDATE_COMMUNITY", payload: updatedCommunity });
    }

    const handleUpdate = async (e, community) => {
        e.preventDefault();
        console.log("Name", communityName)
        console.log("Descr", communityDescription)

        if (communityName === false) newName = community.name
        if (communityDescription === false) newName = community.description
        try {
            const res = await fetch('http://localhost:5000/community/edit', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    _id: community._id,
                    name: newName,
                    description: newCommunity,
                }),
            });
            const data = await res.json();
            console.log("success", data);
            setResults("Change made")
        } catch (error) {
            console.log(error.message)
            setResults("Something went wrong.Reload your page")
        }
    }

    return (
        <>
            <h3 className="pl-3 font-bold text-xl px-4">Communities</h3>
            <h4 className="text-danger font-bold text-red-600 text-lg pl-3">Hover over the text to edit</h4>
            {communities &&
                communities.map((community) => (
                    <form className="border-b-2 px-2" key={community._id} onSubmit={(e) => handleUpdate(e, community)}>
                        <div
                            className=' px-4'
                            contentEditable={true}
                            onInput={(e) => handle(e, community)}
                        >
                            <h4 className='pl-3  text-xl mt-3'>{community.name}</h4>
                        </div>
                        <div
                            contentEditable={true}
                            onInput={(e) => handleDescriptionChange(e, community)}
                            className="px-4"
                        >

                            <p className='pl-3'>{community.description}</p>
                        </div>
                        {results ?
                            <>
                                <p className="pl-6 text-green-500">
                                    {results}
                                </p>
                            </> : null
                        }
                        <div className="mx-5 my-2">

                                <button type="submit"
                                    className=' w-full items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                                            text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none
                                            focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700
                                            dark:focus:ring-gray-800'>Update Community</button>
                        </div>

                    </form>
                ))}
        </>
    );
};

export default EditCommunity;

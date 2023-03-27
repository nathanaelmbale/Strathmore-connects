import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommunityContext } from "../hooks/useCommunityContext";

const EditCommunity = () => {
    const { user } = useAuthContext()
    const { communities, dispatchCommunity } = useCommunityContext()
    const [results, setResults] = useState("")
    const [isCommunityName, setIsCommunityName] = useState(false)
    const [isCommunityDescription, isSetCommunityDescription] = useState(false)
    let newName
    let newCommunity
    let communityName
    let communityDescription

    useEffect(() => {

        const fetchCommunity = async () => {
            const response = await fetch('/community', {
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
        setIsCommunityName(true)

        //dispatchCommunity({ type: "UPDATE_COMMUNITY", payload: updatedCommunity });
    };

    const handleDescriptionChange = (e) => {
        newCommunity = e.target.textContent;
        communityDescription = true
        console.log("edit value", newCommunity, communityDescription)
        isSetCommunityDescription(true)

        //ispatchCommunity({ type: "UPDATE_COMMUNITY", payload: updatedCommunity });
    }

    const handleUpdate = async (e, community) => {
        e.preventDefault();
        console.log("Name", communityName)
        console.log("Descr", communityDescription)

        if (communityName === false) newName = community.name
        if (communityDescription === false) newName = community.description
        try {
            const res = await fetch('/community/edit', {
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
            <h3 className="pl-3">Communities</h3>
            <h4 className="text-danger pl-3">Hover over the text to edit</h4>
            {communities &&
                communities.map((community) => (
                    <form className="conatiner" key={community._id} onSubmit={(e) => handleUpdate(e, community)}>
                        <div
                            className=' community-header pl-2 py-2'
                            contentEditable={true}
                            onInput={(e) => handle(e, community)}
                        >
                            <h4 className='pl-2'>{community.name}</h4>
                        </div>
                        <div
                            contentEditable={true}
                            onInput={(e) => handleDescriptionChange(e, community)}
                        >

                            <p className='pl-3'>{community.description}</p>
                        </div>
                        {results ?
                            <>
                                <p className="p-2 text-success">
                                    {results}
                                </p>
                            </> : null
                        }
                        <div className="conatiner">
                            {isCommunityName || isCommunityDescription ?
                                <button type="submit" className="btn btn-secondary container">Update Community</button> :
                                null
                            }
                        </div>

                    </form>
                ))}
        </>
    );
};

export default EditCommunity;

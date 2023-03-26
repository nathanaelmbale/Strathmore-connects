import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommunityContext } from "../hooks/useCommunityContext";

const EditCommunity = () => {
    const { user } = useAuthContext()
    const { communities } = useCommunityContext();
    const [isCommunityName, setIsCommunityName] = useState(false)
    const [isCommunityDescription, isSetCommunityDescription] = useState(false)
    let newName
    let newCommunity
    let communityName
    let communityDescription


    const handle = (e) => {
        newName = e.target.textContent;
        communityName = true
        console.log("edit value", newName ,communityName)
        setIsCommunityName(true)

        //dispatchCommunity({ type: "UPDATE_COMMUNITY", payload: updatedCommunity });
    };

    const handleDescriptionChange = (e) => {
        newCommunity = e.target.textContent;
        communityDescription= true
        console.log("edit value", newCommunity ,communityDescription)
        isSetCommunityDescription(true)

        //ispatchCommunity({ type: "UPDATE_COMMUNITY", payload: updatedCommunity });
    }

    const handleUpdate = async (e, community) => {
        e.preventDefault();
        console.log("Name",communityName)
        console.log("Descr",communityDescription)

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
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {communities &&
                communities.map((community) => (
                    <form className="conatiner" key={community._id} onSubmit={(e) => handleUpdate(e, community)}>
                        <div
                            className=' community-header border-bottom pl-3 py-2'
                            contentEditable={true}
                            onInput={(e) => handle(e, community)}
                        >
                            <h4 className='clickable-title'>{community.name}</h4>
                        </div>
                        <div
                            contentEditable={true}
                            onInput={(e) => handleDescriptionChange(e, community)}
                        >

                            <p className='text-desc'>{community.description}</p>
                        </div>
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

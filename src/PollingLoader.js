import React, { useEffect, useState } from 'react';
import { useInterval } from './hooks/useInterval';
import { Provider } from '@clayui/core';
import ClayPanel from '@clayui/panel';

function PollingLoader(props) {

    const [status, setStatus] = useState(null);

    useEffect(() => {
        props.pollingService.getStatus(props.objectEntryId).then(newStatus => {
            setStatus(newStatus);
        })
    }, [props]);

    useInterval(() => {
        props.pollingService.getStatus(props.objectEntryId).then(newStatus => {
            setStatus(newStatus);
        })
        console.log("coucou");
    }, 1000);

    return (
        <>
            <Provider spritemap={props.spriteMap}>
                {props.mode === "edit" ? (
                    <>

                        <ClayPanel.Group flush>
                            <ClayPanel
                                displayTitle="Pending"
                                displayType="unstyled"
                                role="tab"
                                showCollapseIcon={false}
                            >
                                <ClayPanel.Body>
                                    <slot key="PENDING" name="PENDING" />                                    
                                </ClayPanel.Body>
                            </ClayPanel>

                            <ClayPanel
                                displayTitle="Success"
                                displayType="unstyled"
                                role="tab"
                                showCollapseIcon={false}
                            >
                                <ClayPanel.Body>
                                    <slot key="SUCCESS" name="SUCCESS" />
                                </ClayPanel.Body>
                            </ClayPanel>

                            <ClayPanel
                                displayTitle="Failure"
                                displayType="unstyled"
                                role="tab"
                                showCollapseIcon={false}
                            >
                                <ClayPanel.Body>
                                    <slot key="FAILURE" name="FAILURE" />
                                </ClayPanel.Body>
                            </ClayPanel>


                        </ClayPanel.Group>

                    </>
                ) : (
                    <>
                        {status === "SUCCESS" ? (
                            <slot key="SUCCESS" name="SUCCESS" />
                        ) : status === "FAILURE" ? (
                            <slot key="FAILURE" name="FAILURE" />
                        ) : (
                            <slot key="PENDING" name="PENDING" />
                        )}
                    </>
                )}
            </Provider>
        </>
    );

}

export default PollingLoader;
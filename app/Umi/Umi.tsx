import * as React from 'react'

interface IUmiProps {
}

export default class Umi extends React.Component<IUmiProps, {}> {
    // Get Position
    // Remove Current content
    // Split Horizontally
    // Split Vertically
    // Search / Load content

    render() {
        return (
            <div className="umi">
                <header>
                    <strong className="title">Title</strong>
                </header>
                <main>
                    Content
                </main>
                <footer>
                    Additional Information
                </footer>
            </div>
        );
    }
}
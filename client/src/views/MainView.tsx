import React, { Component } from "react";
import { Round } from "../model/Round";
import { fetchConfig } from "../utils/api";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, AppBar, Toolbar, Typography, Drawer, createStyles, Theme, withStyles, StyledComponentProps, CircularProgress, WithStyles } from "@material-ui/core";
import { Sidebar } from "../components/Sidebar";
import { styles } from "./MainStyles";
import { Header } from "../components/Header";
import { RoundContainer } from "../components/RoundContainer";

interface MainViewState {
    rounds: Round[];
    isLoading: boolean;
    selectedRound?: Round;
}

interface MainViewProps extends WithStyles<typeof styles> {}

export const MainView = withStyles(styles)(class extends Component<MainViewProps, MainViewState> {
    state: MainViewState = {
        rounds: [],
        isLoading: true
    };

    async componentDidMount() {
        const config = await fetchConfig();
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.setState({
            rounds: config.rounds,
            isLoading: false
        });
    }

    render() {
        const {isLoading, rounds, selectedRound} = this.state;
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Header {...this.props} />
                <Sidebar
                    {...this.props}
                    isLoading={isLoading}
                    rounds={rounds}
                    onRoundClicked={round => this.setState({selectedRound: round})}
                />
                <RoundContainer
                    {...this.props}
                    round={selectedRound}
                />
            </div>
        );
    }
});

// export const MainView = withStyles(styles)(MainView);